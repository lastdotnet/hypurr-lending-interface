import { z } from 'zod'

import { ChainIdSchema } from 'chains'
import { AddressSchema, Uint256Schema } from 'common'

import { PaginatedResponseSchema, PaginationParametersSchema } from '@/app/api/_/pagination-schemas'

import { ERC20Schema } from 'assets'

const LeaderboardEntrySchema = z.object({
  address: AddressSchema,
  id: AddressSchema,
  points: Uint256Schema,
  rank: z.number(),
})
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>

export const GETLeaderboardResponseSchema = PaginatedResponseSchema.extend({
  leaderboard: z.array(LeaderboardEntrySchema),
})
export type GETLeaderboardResponse = z.infer<typeof GETLeaderboardResponseSchema>

export const GETPointsParametersSchema = z.object({
  address: AddressSchema,
})
export type GETPointsParameters = z.infer<typeof GETPointsParametersSchema>

export const GETPointsResponseSchema = z.object({
  startPoints: Uint256Schema,
  startTime: z.number(),
  totalActiveLoanTokenAmount: Uint256Schema,
})
export type GETPointsResponse = z.infer<typeof GETPointsResponseSchema>

export const GetPointsHistoryParametersSchema = PaginationParametersSchema.extend({
  address: AddressSchema,
})
export type GetPointsHistoryParameters = z.infer<typeof GetPointsHistoryParametersSchema>

export enum EventType {
  BORROW = 'BORROW',
  CheckedIntentFeed = 'CheckedIntentFeed',
  IntentFill = 'IntentFill',
  IntentSubmission = 'IntentSubmission',
  LEND = 'LEND',
  Special = 'Special',
}

export const PointsEventSchema = z.object({
  asset: ERC20Schema.optional(),
  chainId: ChainIdSchema,
  eventType: z.nativeEnum(EventType),
  points: Uint256Schema,
  startTime: Uint256Schema,
})
export type PointsEvent = z.infer<typeof PointsEventSchema>

export const GETPointsHistoryResponseSchema = PaginatedResponseSchema.extend({
  pointsEvents: z.array(PointsEventSchema),
})
export type GETPointsHistoryResponse = z.infer<typeof GETPointsHistoryResponseSchema>
