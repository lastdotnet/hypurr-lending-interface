import { z } from 'zod'

import { AddressSchema, Uint256Schema } from 'common'

const CollectionSchema = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
})

export const ERC721Schema = z.object({
  address: AddressSchema,
  collection: CollectionSchema,
  image: z.string().optional(),
  tokenId: Uint256Schema,
  usdValue: z.union([z.number(), z.null(), z.undefined()]),
})
export type ERC721 = z.infer<typeof ERC721Schema>
