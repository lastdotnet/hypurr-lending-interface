import { z } from 'zod'

import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'

export const GETRefinanceTransactionParametersSchema = z.object({
  chainId: ChainIdSchema,
  intentId: z.string(),
  lender: AddressSchema,
})
export type GETRefinanceTransactionParameters = z.infer<typeof GETRefinanceTransactionParametersSchema>
