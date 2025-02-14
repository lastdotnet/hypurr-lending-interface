import { z } from 'zod'

import { Uint256Schema } from 'common'

import { PaginatedResponseSchema, PaginationParametersSchema } from '@/app/api/_/pagination-schemas'

import { ERC20Schema } from 'assets'

export const GETMarketDetailsResponseSchema = z.object({
  activeLoans: z.number(),
  cumulativeBorrow: z.number(),
  cumulativeCollateral: z.number(),
  intentsCount: Uint256Schema,
  intentVolume: z.number(),
  marketSize: z.number(),
})
export type GETMarketDetailsResponse = z.infer<typeof GETMarketDetailsResponseSchema>

export const AssetDetailSchema = z.object({
  avgApy: Uint256Schema,
  erc20: ERC20Schema.omit({ amount: true }),
  totalBorrowed: Uint256Schema,
  totalCollateral: Uint256Schema,
  usdValueBorrowed: z.number().optional(),
  usdValueCollateral: z.number().optional(),
})
export type AssetDetail = z.infer<typeof AssetDetailSchema>

export const GETAssetDetailsParametersSchema = PaginationParametersSchema.extend({
  isTestnet: z.boolean(),
})
export type GETAssetDetailsParameters = z.infer<typeof GETAssetDetailsParametersSchema>

export const GETAssetDetailsResponseSchema = PaginatedResponseSchema.extend({
  assetDetails: z.array(AssetDetailSchema),
})
export type GETAssetDetailsResponse = z.infer<typeof GETAssetDetailsResponseSchema>
