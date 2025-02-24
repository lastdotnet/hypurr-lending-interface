import { z } from 'zod'

import { Uint256Schema } from 'common'

import { ERC20AssetSchema } from 'assets'

export const VaultSchema = z.object({
  balance: Uint256Schema,
  erc20: ERC20AssetSchema,
  usage: Uint256Schema,
  usdValueBalance: z.number().optional(),
  usdValueUsage: z.number().optional(),
})
export type Vault = z.infer<typeof VaultSchema>
