import { z } from 'zod'

import { ChainIdSchema } from 'chains'
import { AddressSchema, Uint256Schema } from 'common'

import { PaginatedResponseSchema, PaginationParametersSchema } from '@/app/api/_/pagination-schemas'

import { AssetSchema, ERC20Schema } from 'assets'
import { LoanType, ProviderType } from 'sdk'

export const RecallSchema = z.object({
  end: Uint256Schema,
  recaller: AddressSchema,
  start: Uint256Schema,
})

export type Recall = z.infer<typeof RecallSchema>

export enum SourceType {
  BORROWER = 'borrower',
  LENDER = 'lender',
}

export const LoanSchema = z.object({
  apy: Uint256Schema,
  asset: AssetSchema,
  chainId: ChainIdSchema,
  debt: ERC20Schema,
  duration: Uint256Schema.optional(),
  id: z.string(),
  isClaimable: z.boolean(),
  isRecall: z.boolean(),
  isRecallable: z.boolean(),
  loanType: z.nativeEnum(LoanType),
  provider: z.nativeEnum(ProviderType),
  recall: RecallSchema.optional(),
  recallableAt: Uint256Schema,
  source: z.nativeEnum(SourceType),
  startTime: Uint256Schema,
})
export type Loan = z.infer<typeof LoanSchema>

export const GETLoansResponseSchema = PaginatedResponseSchema.extend({
  loans: z.array(LoanSchema),
})
export type GETLoansResponse = z.infer<typeof GETLoansResponseSchema>

export const GETLoansParametersSchema = PaginationParametersSchema.extend({
  address: AddressSchema.optional(),
  isTestnet: z.boolean(),
  source: z.nativeEnum(SourceType).optional(),
})
export type GETLoansParameters = z.infer<typeof GETLoansParametersSchema>
