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
import { getCleanLendIntentFromContracts } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/cleanLendIntentFromContracts'
import { getEstimatedLTV } from '@/app/isolated/intents/_/getEstimatedLTV'
import {
  DECIMALS_SUBTRACTION_FOR_PERCENTAGES,
  NotificationChannel,
  NotificationType,
} from '@/astaria/constants/notifications'
import { executeHelper } from '@/astaria/onchain-helpers/executeHelper'
import { V1LenderEnforcerValidator } from '@/astaria/onchain-helpers/fragments/V1LenderEnforcerValidator'
import { getValidatorConfig } from '@/astaria/onchain-helpers/getValidatorConfig'
import { calculateIntentUsdValues } from '@/astaria/utils/getIntentUsdValue'
import { sendNotification } from '@/astaria/utils/sendNotification'

import { type ERC20Asset, getERC20TokenByAddress, isERC20Asset } from 'assets'
import { Caveat, CaveatStatus, LendIntent, SignedCaveat, SpentItem } from 'indexer/model'
import { calculateAssortmentId } from 'indexer/utils'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'
import { V1LenderDetailsStructABI } from 'sdk/abi/V1LenderDetailsStructABI'

export const insertLendIntent = async ({ chainId, owner, signedCaveat }: InsertSignedCaveatParameters) => {
  const errors = await executeHelper({
    ...V1LenderEnforcerValidator,
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

  const lendIntent = getCleanLendIntentFromContracts(decodeAbiParameters([V1LenderDetailsStructABI], caveat.data)[0])

  const dataSource = await initializeDataSource()

  const minAPYUnparsed: bigint = decodeAbiParameters(
    [BasePricingDetailsStructABI],
    lendIntent.loan.terms.pricingData,
  )[0].rate

  const collateral = lendIntent.loan.collateral.map(
    (item) =>
      new SpentItem({
        ...item,
        itemType: Number(item.itemType),
      }),
  )
  const borrow = lendIntent.loan.debt.map(
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

  // Update of intent count and insertion of offer is done in the same transaction
  await dataSource.manager.transaction(async (manager) => {
    const insertedSignedCaveat = await manager.save(new SignedCaveat(signedCaveatData)).catch((error) => {
      throw new InternalServerError(`Failed to insert SignedCaveat: ${error.message}`)
    })

    const minAmount = lendIntent.minDebtAmount
    const maxAmount = lendIntent.loan.debt[0].amount

    const usdValues = await Promise.all([
      calculateIntentUsdValues({ chainId, token: collateral.at(0) }),
      calculateIntentUsdValues({ chainId, token: borrow.at(0) }),
    ])

    const lendIntentData: LendIntent = {
      ...lendIntent,
      activeApproval: true,
      assortmentId,
      borrow,
      chainId,
      collateral,
      deadline: signedCaveat.deadline,
      id: signedCaveat.signature,
      maxAmount,
      minAmount,
      minAPY: Uint256Schema.parse(minAPYUnparsed),
      shortId: encodeShortID({
        chainId: ChainIdSchema.parse(chainId),
        value: signedCaveat.signature,
      }),
      signedCaveat: insertedSignedCaveat,
      usdValueBorrow: usdValues.at(1),
      usdValueCollateral: usdValues.at(0),
    }
    const intent = new LendIntent(lendIntentData)
    await manager.save(intent).catch((error) => {
      throw new InternalServerError(`Failed to insert lend intent: ${error.message}`)
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

    if (isERC20Asset(collateralData)) {
      const usdValueBorrow = lendIntentData.usdValueBorrow ?? 0
      const usdValueCollateral = lendIntentData.usdValueCollateral ?? 0

      await sendNotification({
        channels: [NotificationChannel.TELEGRAM],
        payload: {
          apy: formatUnits(lendIntentData.minAPY, borrowData?.decimals - DECIMALS_SUBTRACTION_FOR_PERCENTAGES),
          borrowAmount: formatUnits(borrow[0].amount, borrowData?.decimals),
          borrowSymbol: borrowData?.symbol,
          chainId,
          collateralAmount: formatUnits(collateral[0].amount, collateralData?.decimals),
          collateralSymbol: collateralData?.symbol,
          intentType: 'LENDING',
          ltv: getEstimatedLTV({ usdValueBorrow, usdValueCollateral }),
          raw: lendIntentData,
          status: 'CREATED',
          usdValue: usdValueBorrow === 0 ? undefined : usdValueBorrow,
        },
        type: NotificationType.INTENT_CREATED,
      })
    }
  })

  return signedCaveat
}
