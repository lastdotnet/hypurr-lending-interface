import { z } from 'zod'

import { AMOUNT_VALIDATION } from '@/astaria/validation/amount'
import { APY_VALIDATION } from '@/astaria/validation/apy'
import { enoughBalance } from '@/astaria/validation/enoughBalance'
import { LTV_VALIDATION } from '@/astaria/validation/ltv'
import { minimumAssetValue } from '@/astaria/validation/minimumAssetValue'

import { ERC20AssetSchema, IntentAssetSchema } from 'assets'

export const borrowIntentFormObject = z.object({
  apy: APY_VALIDATION,
  borrowAmount: AMOUNT_VALIDATION,
  borrowAsset: ERC20AssetSchema,
  collateralAmount: AMOUNT_VALIDATION,
  collateralAsset: IntentAssetSchema,
  ltv: LTV_VALIDATION(),
})
export const borrowIntentFormSchema = borrowIntentFormObject.superRefine(
  async ({ borrowAmount, borrowAsset, collateralAmount, collateralAsset }, ctx) => {
    await enoughBalance(
      {
        amount: collateralAmount,
        asset: collateralAsset,
        fieldName: 'collateralAmount',
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
  },
)
export type BorrowIntentFormSchema = z.infer<typeof borrowIntentFormSchema>
