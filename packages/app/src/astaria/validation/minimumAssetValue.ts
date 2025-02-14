import { z } from 'zod'

import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type IntentAsset, isERC20Asset } from 'assets'

const MINIMUM_USD_VALUE = 100

export const minimumAssetValue = async (
  {
    amount,
    asset,
    fieldName,
  }: {
    amount: bigint | undefined
    asset: IntentAsset
    fieldName: string
  },
  ctx: z.RefinementCtx,
) => {
  if (isERC20Asset(asset)) {
    if (amount) {
      const usdValue = getUSDValue({
        amount,
        decimals: asset.decimals,
        usdValue: asset.usdValue,
      })

      if (usdValue && usdValue < MINIMUM_USD_VALUE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Enter $${MINIMUM_USD_VALUE} or more`,
          path: [fieldName],
        })
        return z.NEVER
      }
    }
  }
}
