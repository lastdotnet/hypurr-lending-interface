import { z } from 'zod';

import { AddressSchema, HexSchema, Uint256Schema } from 'common';

import { SpentItemSchema } from './seaport';

export const TermsSchema = z.object({
  pricing: AddressSchema,
  pricingData: HexSchema,
  settlement: AddressSchema,
  settlementData: HexSchema,
  status: AddressSchema,
  statusData: HexSchema,
});
export type Terms = z.infer<typeof TermsSchema>;

export const StarportLoanSchema = z.object({
  borrower: AddressSchema,
  collateral: SpentItemSchema.array().readonly(),
  custodian: AddressSchema,
  debt: SpentItemSchema.array().readonly(),
  issuer: AddressSchema,
  originator: AddressSchema,
  start: Uint256Schema,
  terms: TermsSchema,
});
export type StarportLoan = z.infer<typeof StarportLoanSchema>;

export enum Action {
  Nothing,
  Repayment,
  Settlement,
}
