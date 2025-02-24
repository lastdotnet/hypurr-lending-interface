import { z } from 'zod'

import { AddressSchema, HexSchema, Uint256Schema } from 'common'

import { CaveatSchema } from './caveats'

export const TypeSchema = z.object({
  name: z.string().readonly(),
  type: z.string().readonly(),
})

export const TypesSchema = z.object({
  Caveat: z.array(TypeSchema).readonly(),
  Origination: z.array(TypeSchema).readonly(),
})

export const DomainSchema = z.object({
  chainId: z.number().positive(),
  name: z.string(),
  verifyingContract: AddressSchema,
  version: z.string(),
})

export const MessageSchema = z.object({
  account: AddressSchema,
  accountNonce: Uint256Schema,
  caveats: CaveatSchema.array(),
  deadline: Uint256Schema,
  salt: HexSchema,
  singleUse: z.boolean(),
})
export type Message = z.infer<typeof MessageSchema>

export const TypedDataSchema = z.object({
  domain: DomainSchema,
  message: MessageSchema,
  primaryType: z.string(),
  types: TypesSchema,
})
export type TypedData<PrimaryType extends string = string> = z.infer<typeof TypedDataSchema> & {
  primaryType: PrimaryType
}
