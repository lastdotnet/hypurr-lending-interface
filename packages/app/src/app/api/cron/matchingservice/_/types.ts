import { z } from 'zod'

import { AddressSchema, HexSchema, Uint256Schema } from 'common'

import { SignedCaveatSchema, SpentItemSchema, StarportLoanSchema } from 'sdk'

export const SignedCaveatWithOwnerAndIdSchema = SignedCaveatSchema.extend({
  id: z.string(),
  owner: AddressSchema,
})
export type SignedCaveatWithOwnerAndId = z.infer<typeof SignedCaveatWithOwnerAndIdSchema>

export const StarportLoanSchemaWithId = StarportLoanSchema.extend({
  id: z.string(),
})
export type StarportLoanWithId = z.infer<typeof StarportLoanSchemaWithId>

export const BorrowIntentAssortmentIdSchema = z.object({
  intent_assortment_id: z.string(),
})

export const LendIntentAssortmentIdSchema = z.object({
  offer_assortment_id: z.string(),
})

export const BorrowerIntentSchema = z.object({
  assortmentId: z.string(),
  borrow: SpentItemSchema.array(),
  collateral: SpentItemSchema.array(),
  deadline: Uint256Schema,
  endRate: Uint256Schema,
  endTime: Uint256Schema,
  id: z.string(),
  isRecall: z.union([z.boolean(), z.null()]),
  maxAmount: Uint256Schema,
  minAmount: Uint256Schema,
  startRate: Uint256Schema,
  startTime: Uint256Schema,
})
export type BorrowerIntent = z.infer<typeof BorrowerIntentSchema>

export const LenderIntentSchema = z.object({
  assortmentId: z.string(),
  borrow: SpentItemSchema.array(),
  collateral: SpentItemSchema.array(),
  deadline: Uint256Schema,
  id: HexSchema,
  maxAmount: Uint256Schema,
  minAmount: Uint256Schema,
  minAPY: Uint256Schema,
})
export type LenderIntent = z.infer<typeof LenderIntentSchema>

export const LenderIntentWithCapacitySchema = LenderIntentSchema.extend({
  capacity: Uint256Schema,
  singleUse: z.boolean(),
})
export type LenderIntentWithCapacity = z.infer<typeof LenderIntentWithCapacitySchema>
