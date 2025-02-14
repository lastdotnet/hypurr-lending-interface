import { z } from 'zod'

import { AMOUNT_VALIDATION } from '@/astaria/validation/amount'

import { ERC20AssetSchema } from 'assets'

export const depositFundsFormSchema = z.object({
  depositAmount: AMOUNT_VALIDATION,
  depositAsset: ERC20AssetSchema,
})
export type DepositFundsFormSchema = z.infer<typeof depositFundsFormSchema>
