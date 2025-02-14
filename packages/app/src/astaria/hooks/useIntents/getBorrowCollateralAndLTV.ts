import { type Hex } from 'viem'
import { decodeAbiParameters } from 'viem/utils'

import { type ChainId } from 'chains'
import { calculateCompoundInterest, getNowInSecondsBigInt } from 'common'

import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { getLTV } from '@/astaria/utils/getLTV'

import { type Asset, type ERC20, isERC20Asset } from 'assets'
import { BorrowIntent as IndexerBorrowIntent, type LendIntent as IndexerLendIntent } from 'indexer/model'
import { SpentItemSchema } from 'sdk'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'

export const getBorrowCollateralAndLTV = async ({
  assets,
  chainId,
  intent,
}: {
  assets: Map<string, Asset>
  chainId: ChainId
  intent: IndexerBorrowIntent | IndexerLendIntent
}) => {
  const borrowFromAPI = intent.borrow.at(0)

  if (!borrowFromAPI) {
    throw new Error('INTENT_INVALID', {
      cause: 'Missing borrow from api',
    })
  }
  const collateralFromAPI = intent.collateral.at(0)
  if (!collateralFromAPI) {
    throw new Error('INTENT_INVALID', {
      cause: 'Missing collateral from api',
    })
  }

  const collateralAsset = assets.get(
    getSpentItemCacheKey({
      item: SpentItemSchema.parse(collateralFromAPI),
    }),
  )
  if (!collateralAsset) {
    throw new Error('INTENT_INVALID', {
      cause: 'Missing collateral asset',
    })
  }

  const borrowAsset = assets.get(
    getSpentItemCacheKey({
      item: SpentItemSchema.parse(borrowFromAPI),
    }),
  )
  if (!borrowAsset) {
    throw new Error('INTENT_INVALID', {
      cause: 'Missing borrow asset',
    })
  }

  if (!isERC20Asset(borrowAsset)) {
    throw new Error('INTENT_INVALID', {
      cause: 'Borrow asset must be ERC20',
    })
  }

  const borrow: ERC20 = {
    ...borrowAsset,
    amount: borrowFromAPI.amount,
    chainId,
  }

  const collateral: Asset = isERC20Asset(collateralAsset)
    ? {
        ...collateralAsset,
        amount: collateralFromAPI.amount,
        chainId,
      }
    : {
        ...collateralAsset,
        chainId,
      }

  let amount = borrow.amount
  if (intent instanceof IndexerBorrowIntent && intent.recall) {
    const starportLoan = intent.recall.starportLoan
    const delta = getNowInSecondsBigInt() - starportLoan.start
    const pricingDetails = decodeAbiParameters([BasePricingDetailsStructABI], starportLoan.terms.pricingData as Hex)[0]
    const interest = calculateCompoundInterest({
      amount: starportLoan.debt[0].amount,
      apy: pricingDetails.rate,
      decimals: Number(pricingDetails.decimals),
      delta,
    })

    amount = interest + starportLoan.debt[0].amount
  }
  const ltv = getLTV({
    borrowAmount: amount,
    borrowAsset,
    collateralAmount: collateralFromAPI.amount,
    collateralAsset: collateral,
  })

  return { borrow, collateral, ltv }
}
