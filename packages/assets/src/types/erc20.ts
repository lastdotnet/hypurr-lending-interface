import { z } from 'zod'

import { ChainIdSchema } from 'chains'
import { AddressSchema, Uint256Schema } from 'common'

export const ERC20Schema = z.object({
  address: AddressSchema,
  amount: Uint256Schema,
  chainId: ChainIdSchema,
  decimals: z.number(),
  logoURI: z.union([z.string(), z.null()]).optional(),
  name: z.string(),
  symbol: z.string(),
  usdValue: z.union([z.number(), z.null(), z.undefined()]),
})
export type ERC20 = z.infer<typeof ERC20Schema>
export const ERC20AssetSchema = ERC20Schema.omit({
  amount: true,
})
export type ERC20Asset = z.infer<typeof ERC20AssetSchema>

export const ERC20WithChainIdAndStartPointsTimestampSchema = ERC20Schema.extend({
  startPointsTimestamp: z.number().optional(),
})
export type ERC20WithChainIdAndStartPointsTimestamp = z.infer<typeof ERC20WithChainIdAndStartPointsTimestampSchema>
