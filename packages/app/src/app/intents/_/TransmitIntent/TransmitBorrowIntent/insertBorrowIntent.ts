'use server'

import { wagmiConfig } from '@/astaria/config/wagmi'
import { getToken } from 'wagmi/actions'
import { type Address, decodeAbiParameters, formatUnits, hashTypedData } from 'viem'

import { ChainIdSchema } from 'chains'
import { Uint256Schema, encodeShortID } from 'common'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getTypedData } from '@/app/api/_/getTypedData'
import { type InsertSignedCaveatParameters } from '@/app/api/_/inset-signed-caveat-schemas'
import { BadRequestError, InternalServerError } from '@/app/api/server-error'
import { getCleanBorrowIntentFromContracts } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/cleanBorrowIntentFromContracts'
import { getEstimatedLTV } from '@/app/intents/_/getEstimatedLTV'
import {
  DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
  NotificationChannel,
  NotificationType,
} from '@/astaria/constants/notifications'
import { executeHelper } from '@/astaria/onchain-helpers/executeHelper'
import { V1BorrowerEnforcerValidator } from '@/astaria/onchain-helpers/fragments/V1BorrowerEnforcerValidator'
import { getValidatorConfig } from '@/astaria/onchain-helpers/getValidatorConfig'
import { calculateAssortmentId } from '@/astaria/utils/calculateAssortmentId'
import { getCollectionNameAndTokenId } from '@/astaria/utils/getCollectionNameAndTokenId'
import { calculateIntentUsdValues } from '@/astaria/utils/getIntentUsdValue'
import { sendNotification } from '@/astaria/utils/sendNotification'

import { type ERC20Asset, getERC20TokenByAddress, isERC20Asset, isERC721Asset } from 'assets'
import { BorrowIntent, Caveat, CaveatStatus, SignedCaveat, SpentItem } from 'indexer/model'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { V1BorrowerDetailsStructABI } from 'sdk/abi/V1BorrowerDetailsStructABI'

export const insertBorrowIntent = async ({ chainId, owner, signedCaveat }: InsertSignedCaveatParameters) => {
  const errors = await executeHelper({
    ...V1BorrowerEnforcerValidator,
    args: [
      {
        ...getValidatorConfig({ chainId }),
        caveat: signedCaveat,
        signer: owner,
      },
    ],
    chainId,
  })

  if (errors.length > 0) {
    throw new BadRequestError(errors.join(';'))
  }

  const caveat = signedCaveat.caveats.at(0)

  if (!caveat) {
    throw new BadRequestError('Caveat at index 0 is undefined')
  }

  const borrowIntent = getCleanBorrowIntentFromContracts(
    decodeAbiParameters([V1BorrowerDetailsStructABI], caveat.data)[0],
  )

  const dataSource = await initializeDataSource()

  // insert caveat

  // Make sure that intents and caveats are inserted in the same transaction
  await dataSource.manager.transaction(async (manager) => {
    const maxAPUUnparsed: bigint = decodeAbiParameters(
      [BasePricingDetailsStructABI],
      borrowIntent.loan.terms.pricingData,
    )[0].rate
    const maxAPY = Uint256Schema.parse(maxAPUUnparsed)
    const collateral = borrowIntent.loan.collateral.map(
      (item) =>
        new SpentItem({
          ...item,
          itemType: Number(item.itemType),
        }),
    )
    const borrow = borrowIntent.loan.debt.map(
      (item) =>
        new SpentItem({
          ...item,
          itemType: Number(item.itemType),
        }),
    )

    const assortmentId = calculateAssortmentId(collateral, borrow)

    const signedCaveatData: SignedCaveat = {
      ...signedCaveat,
      caveats: signedCaveat.caveats.map((caveat) => new Caveat({ ...caveat })),
      chainId,
      createdAt: new Date(),
      deadline: signedCaveat.deadline,
      hash: hashTypedData(
        getTypedData({
          account: owner,
          accountNonce: signedCaveat.nonce,
          caveats: signedCaveat.caveats,
          chainId,
          deadline: signedCaveat.deadline,
          salt: signedCaveat.salt,
          singleUse: signedCaveat.singleUse,
        }),
      ),
      id: signedCaveat.signature,
      nonce: signedCaveat.nonce.toString(),
      owner: owner.toLowerCase(),
      salt: signedCaveat.salt,
      status: CaveatStatus.Active,
    }

    const insertedSignedCaveat = await manager.save(new SignedCaveat(signedCaveatData)).catch((error) => {
      throw new InternalServerError(`Failed to insert SignedCaveat: ${error.message}`)
    })

    const usdValues = await Promise.all([
      calculateIntentUsdValues({ chainId, token: collateral.at(0) }),
      calculateIntentUsdValues({ chainId, token: borrow.at(0) }),
    ])

    const borrowIntentData: BorrowIntent = {
      ...borrowIntent,
      activeApproval: true,
      assortmentId,
      borrow,
      chainId,
      collateral,
      deadline: signedCaveat.deadline,
      endRate: maxAPY,
      id: signedCaveat.signature,
      isRecall: false,
      recall: null,
      shortId: encodeShortID({
        chainId: ChainIdSchema.parse(chainId),
        value: signedCaveat.signature,
      }),
      signedCaveat: insertedSignedCaveat,
      usdValueBorrow: usdValues.at(1),
      usdValueCollateral: usdValues.at(0),
    }

    const intent = new BorrowIntent(borrowIntentData)

    await manager.save(intent).catch((error) => {
      throw new InternalServerError(`Failed to insert borrow intent: ${error.message}`)
    })

    // NB: Leaving plumbing in place for future filled intent notifications
    // but currently disabled, returns early intentionally
    if (!process.env.NEVER_GONNA_GIVE_YOU_UP_NEVER_GONNA_HAVE_A_VALUE) {
      return
    }

    let [borrowData, collateralData] = await Promise.all([
      getERC20TokenByAddress({ address: borrow[0].token as Address }),
      getERC20TokenByAddress({ address: collateral[0].token as Address }),
    ])

    if (!borrowData) {
      borrowData = {
        ...(await getToken(wagmiConfig, {
          address: borrow[0].token as Address,
          chainId,
        })),
        chainId,
      } as ERC20Asset
    }

    if (!collateralData) {
      collateralData = {
        ...(await getToken(wagmiConfig, {
          address: collateral[0].token as Address,
          chainId,
        })),
        chainId,
      } as ERC20Asset
    }

    const usdValueBorrow = borrowIntentData.usdValueBorrow ?? 0
    const usdValueCollateral = borrowIntentData.usdValueCollateral ?? 0

    const apy = formatUnits(maxAPY, borrowData.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES)
    const ltv = getEstimatedLTV({ usdValueBorrow, usdValueCollateral })
    const borrowAmount = formatUnits(borrow[0].amount, borrowData?.decimals)
    const borrowSymbol = borrowData?.symbol ?? 'Unknown'
    const usdValue = usdValueBorrow === 0 ? undefined : usdValueBorrow

    if (isERC20Asset(collateralData)) {
      await sendNotification({
        channels: [NotificationChannel.TELEGRAM],
        payload: {
          apy,
          borrowAmount,
          borrowSymbol,
          chainId,
          collateralAmount: formatUnits(collateral[0].amount, collateralData?.decimals),
          collateralSymbol: collateralData?.symbol,
          intentType: 'BORROW',
          ltv,
          raw: borrowIntentData,
          status: 'CREATED',
          usdValue,
        },
        type: NotificationType.INTENT_CREATED,
      })

      return
    }

    if (isERC721Asset(collateralData)) {
      await sendNotification({
        channels: [NotificationChannel.TELEGRAM],
        payload: {
          apy,
          borrowAmount,
          borrowSymbol,
          chainId,
          collateralAmount: '1',
          collateralSymbol: getCollectionNameAndTokenId(collateralData) ?? 'Unknown NFT',
          intentType: 'BORROW',
          ltv,
          raw: borrowIntentData,
          status: 'CREATED',
          usdValue,
        },
        type: NotificationType.INTENT_CREATED,
      })

      return
    }
  })

  return signedCaveat
}
