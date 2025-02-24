import {
  type BorrowerIntent,
  type LenderIntent,
  type LenderIntentWithCapacity,
} from '@/app/api/cron/matchingservice/_/types'

export const calculateMatchAmount = ({
  borrowIntent,
  capacity,
  lendIntent,
}: {
  borrowIntent: BorrowerIntent
  capacity: bigint
  lendIntent: LenderIntent | LenderIntentWithCapacity
}) => {
  if (capacity < lendIntent.maxAmount && capacity < borrowIntent.maxAmount) {
    return capacity
  }

  // TODO: Joe look at this. It was previously unused
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // biome-ignore lint/correctness/noUnusedVariables:
  const lendIntentMinAmount = lendIntent.minAmount > lendIntent.maxAmount ? lendIntent.maxAmount : lendIntent.minAmount

  return lendIntent.maxAmount < borrowIntent.maxAmount ? lendIntent.maxAmount : borrowIntent.maxAmount
}
