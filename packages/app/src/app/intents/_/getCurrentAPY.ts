import { type Hex } from 'viem'
import { decodeAbiParameters } from 'viem/utils'

import { getNowInSecondsBigInt } from 'common'

import { type BorrowerIntent } from '@/app/api/cron/matchingservice/_/types'
import { type BorrowIntent, type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'

import { type BorrowIntent as IndexerBorrowIntent } from 'indexer/model'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'

export const getCurrentAPYForIndexerOrBorrowerIntent = ({
  borrowIntent,
  currentTime,
}: {
  borrowIntent: IndexerBorrowIntent | BorrowerIntent
  currentTime: bigint
}) => {
  const duration = BigInt(borrowIntent.endTime - borrowIntent.startTime)
  return getCurrentAPYWithTimestamp({
    currentTime,
    duration,
    endRate: borrowIntent.endRate,
    endTime: borrowIntent.endTime,
    startRate: borrowIntent.startRate,
    startTime: borrowIntent.startTime,
  })
}

export const getCurrentAPYForBorrowIntent = (borrowIntent: BorrowIntent) =>
  getCurrentAPYWithTimestamp({
    currentTime: getNowInSecondsBigInt(),
    duration: borrowIntent.duration,
    endRate: borrowIntent.endRate,
    endTime: borrowIntent.endTime,
    startRate: borrowIntent.startRate,
    startTime: borrowIntent.startTime,
  })

export const getCurrentAPYForBorrowIntentWithRecall = (borrowIntentWithRecall: BorrowIntentWithRecall) =>
  getCurrentAPYWithTimestamp({
    currentTime: getNowInSecondsBigInt(),
    duration: borrowIntentWithRecall.duration,
    endRate: borrowIntentWithRecall.endRate,
    endTime: borrowIntentWithRecall.recallEndTime,
    startRate: borrowIntentWithRecall.startRate,
    startTime: borrowIntentWithRecall.recallStartTime,
  })

export const getOriginationApy = (borrowIntentWithRecall: BorrowIntentWithRecall) => {
  const pricingDetails = decodeAbiParameters(
    [BasePricingDetailsStructABI],
    borrowIntentWithRecall.starportLoan.terms.pricingData as Hex,
  )[0]

  return pricingDetails.rate
}
export const getCurrentAPYWithTimestamp = ({
  currentTime,
  duration,
  endRate,
  endTime,
  startRate,
  startTime,
}: {
  currentTime: bigint
  duration: bigint
  endRate: bigint
  endTime: bigint
  startRate: bigint
  startTime: bigint
}) => {
  const cappedCurrentTime = currentTime > endTime ? endTime : currentTime
  const elapsed = cappedCurrentTime - startTime
  const remaining = duration - elapsed

  return (startRate * remaining + endRate * elapsed) / duration
}
