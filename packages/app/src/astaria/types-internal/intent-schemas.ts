import { z } from 'zod'

import { ChainIdSchema } from 'chains'
import { AddressSchema, HexSchema, Uint256NonZeroSchema, Uint256Schema } from 'common'

import { PaginatedResponseSchema, PaginationParametersSchema } from '@/app/api/_/pagination-schemas'
import { LoanSchema } from '@/astaria/types-internal/loan-schemas'

import { AssetSchema, ERC20Schema } from 'assets'
import { StarportLoanSchema } from 'sdk'

export const AstariaV1BorrowerIntentSchema = z.object({
  endTime: Uint256Schema,
  loan: StarportLoanSchema,
  maxAmount: Uint256Schema,
  minAmount: Uint256Schema,
  startRate: Uint256Schema,
  startTime: Uint256Schema,
})
export const AstariaV1LenderOfferSchema = z.object({
  loan: StarportLoanSchema,
  matchIdentifier: z.boolean(),
  minDebtAmount: Uint256Schema,
})
export const BaseIntentSchema = z.object({
  borrow: ERC20Schema,
  chainId: ChainIdSchema,
  collateral: AssetSchema,
  deadline: Uint256Schema,
  duration: Uint256Schema,
  id: z.string(),
  ltv: z.number().optional().nullable(),
  owner: AddressSchema,
  randomNumber: z.number(),
  shortId: z.string(),
})
const BaseBorrowIntentSchema = BaseIntentSchema.extend({
  endRate: Uint256Schema,
  endTime: Uint256Schema,
  isRecall: z.boolean(),
  startRate: Uint256Schema,
  startTime: Uint256Schema,
})
export const UserBorrowIntentSchema = BaseBorrowIntentSchema.extend({
  isRecall: z.literal(false),
  nonce: Uint256Schema,
  salt: HexSchema,
})
export type UserBorrowIntent = z.infer<typeof UserBorrowIntentSchema>

export const BorrowIntentWithRecallSchema = BaseBorrowIntentSchema.extend({
  borrower: AddressSchema,
  isRecall: z.literal(true),
  loan: LoanSchema,
  recallEndTime: Uint256Schema,
  recallStartTime: Uint256Schema,
  starportLoan: StarportLoanSchema,
})
export type BorrowIntentWithRecall = z.infer<typeof BorrowIntentWithRecallSchema>

export const BorrowIntentSchema = z.discriminatedUnion('isRecall', [
  BorrowIntentWithRecallSchema,
  UserBorrowIntentSchema,
])
export type BorrowIntent = z.infer<typeof BorrowIntentSchema>

export const LendIntentSchema = BaseIntentSchema.extend({
  maxAmount: Uint256Schema,
  minAmount: Uint256Schema,
  minAPY: Uint256Schema,
  singleUse: z.boolean(),
})
export type LendIntent = z.infer<typeof LendIntentSchema>

export const RatioLendIntentSchema = BaseIntentSchema.extend({
  apy: Uint256Schema,
  collateralToDebtRatio: Uint256Schema,
  minCollateralAmount: Uint256Schema,
})
export type RatioLendIntent = z.infer<typeof RatioLendIntentSchema>

export const IntentFilterParametersSchema = z.object({
  borrowAsset: AddressSchema.optional(),
  collateralAsset: AddressSchema.optional(),
  filterBorrowIntents: z.boolean().optional(),
  filterLendIntents: z.boolean().optional(),
  isExpertMode: z.boolean(),
  maxLTV: z.number().optional(),
  minAPY: Uint256Schema.optional(),
})
export type IntentFilterParameters = z.infer<typeof IntentFilterParametersSchema>

export const GETIntentsParametersSchema = PaginationParametersSchema.extend({
  intentFilterParameters: IntentFilterParametersSchema,
  isTestnet: z.boolean(),
})
export type GETIntentsParameters = z.infer<typeof GETIntentsParametersSchema>

export const GETIntentsResponseSchema = PaginatedResponseSchema.extend({
  intents: z.array(z.union([BorrowIntentSchema, LendIntentSchema])),
})
export type GETIntentsResponse = z.infer<typeof GETIntentsResponseSchema>

export const GETIntentParametersSchema = z.object({
  shortId: z.string(),
})
export type GETIntentParameters = z.infer<typeof GETIntentParametersSchema>
export const GETIntentResponseSchema = z.object({
  intent: z.union([BorrowIntentSchema, LendIntentSchema]),
  isArchived: z.boolean(),
})
export type GETIntentResponse = z.infer<typeof GETIntentResponseSchema>

export const BorrowIntentRequestSchema = z.object({
  apy: Uint256NonZeroSchema,
  borrow: ERC20Schema,
  borrowMaxAmount: Uint256NonZeroSchema,
  borrowMinAmount: Uint256NonZeroSchema,
  collateral: AssetSchema,
})
export type BorrowIntentRequest = z.infer<typeof BorrowIntentRequestSchema>

export const LendIntentRequestSchema = BorrowIntentRequestSchema.extend({
  repeatFill: z.boolean(),
})
export type LendIntentRequest = z.infer<typeof LendIntentRequestSchema>
