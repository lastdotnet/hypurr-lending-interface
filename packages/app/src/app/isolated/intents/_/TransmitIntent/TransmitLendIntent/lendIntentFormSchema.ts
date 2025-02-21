import { z } from 'zod'

import { borrowIntentFormObject } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { LEND_INTENTS_LTV_MAX } from '@/astaria/constants/constants'
import { enoughBalance } from '@/astaria/validation/enoughBalance'
import { LTV_VALIDATION } from '@/astaria/validation/ltv'
import { minimumAssetValue } from '@/astaria/validation/minimumAssetValue'

export const lendIntentFormSchema = borrowIntentFormObject
  .extend({
    ltv: LTV_VALIDATION(LEND_INTENTS_LTV_MAX),
    repeatFill: z.boolean(),
  })

  .superRefine(async ({ borrowAmount, borrowAsset, collateralAmount, collateralAsset }, ctx) => {
    await enoughBalance(
      {
        amount: borrowAmount,
        asset: borrowAsset,
        fieldName: 'borrowAmount',
      },
      ctx,
    )
    await minimumAssetValue(
      {
        amount: borrowAmount,
        asset: borrowAsset,
        fieldName: 'borrowAmount',
      },
      ctx,
    )
    await minimumAssetValue(
      {
        amount: collateralAmount,
        asset: collateralAsset,
        fieldName: 'collateralAmount',
      },
      ctx,
    )
  })
export type LendIntentFormSchema = z.infer<typeof lendIntentFormSchema>
