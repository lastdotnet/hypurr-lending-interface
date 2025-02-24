import type { Hex } from 'viem'

import type { BorrowerIntent, LenderIntentWithCapacity } from '@/app/api/cron/matchingservice/_/types'

import { ItemType } from 'sdk'

//returns true if there is overlap
const isAmountBoundMatch = ({
  borrowIntent,
  lendIntent,
}: {
  borrowIntent: BorrowerIntent
  lendIntent: LenderIntentWithCapacity
}) => {
  const lendIntentMaxAmount = lendIntent.capacity < lendIntent.maxAmount ? lendIntent.capacity : lendIntent.maxAmount

  const lendIntentMinAmount = lendIntent.minAmount > lendIntent.maxAmount ? lendIntent.maxAmount : lendIntent.minAmount

  return !(lendIntentMaxAmount < borrowIntent.minAmount || borrowIntent.maxAmount < lendIntentMinAmount)
}

export const ITEM_TYPES_DONT_MATCH_ERROR =
  'Unexpected mismatch of order where assortmentIds matched but collateral types do not match'

export const isMatch = ({
  borrowIntent,
  borrowIntentSettlementParams,
  currentAPY,
  lendIntent,
  lendIntentSettlementParams,
}: {
  borrowIntent: BorrowerIntent
  borrowIntentSettlementParams: Hex
  currentAPY: bigint
  lendIntent: LenderIntentWithCapacity
  lendIntentSettlementParams: Hex
}) => {
  if (borrowIntentSettlementParams !== lendIntentSettlementParams) {
    return false
  }
  // debt amount bounds check
  if (!isAmountBoundMatch({ borrowIntent, lendIntent })) {
    return false
  }

  // collateral amount bounds check
  if (
    borrowIntent.collateral[0].itemType === ItemType.ERC20 &&
    lendIntent.collateral[0].itemType === ItemType.ERC20 &&
    borrowIntent.collateral[0].amount < lendIntent.collateral[0].amount
  ) {
    return false
  }
  if (
    borrowIntent.collateral[0].itemType === ItemType.ERC721 &&
    lendIntent.collateral[0].itemType === ItemType.ERC721 &&
    lendIntent.collateral[0].identifier !== borrowIntent.collateral[0].identifier
  ) {
    return false
  }
  if (borrowIntent.collateral[0].itemType !== lendIntent.collateral[0].itemType) {
    throw new Error(ITEM_TYPES_DONT_MATCH_ERROR)
  }

  return currentAPY >= lendIntent.minAPY
}
