import { z } from 'zod'

import { type ChainId, ChainIdSchema } from 'chains'

export const DECIMALS_MULTIPLIER_FOR_PERCENTAGES = 100
export const DECIMALS_SUBTRACTION_FOR_PERCENTAGES = 2
export const MINIMUM_USD_VALUE = 250
export const HIGH_APY_THRESHOLD = 90n
export const HIGHER_APY_THRESHOLD = 200n

export enum NotificationType {
  HIGHER_APY = 'HIGHER_APY',
  HIGHER_APY_LAST_CHANCE = 'HIGHER_APY_LAST_CHANCE',
  HIGH_APY = 'HIGH_APY',
  INTENT_CREATED = 'INTENT_CREATED',
  INTENT_FILLED = 'INTENT_FILLED',
}

export enum NotificationChannel {
  DISCORD = 'DISCORD',
  PUSH = 'PUSH',
  SLACK = 'SLACK',
  TELEGRAM = 'TELEGRAM',
}

export const notificationStatus = z.union([z.literal('FILLED'), z.literal('CREATED'), z.literal('OPEN')])

export type NotificationStatus = z.infer<typeof notificationStatus>

export const intentType = z.union([z.literal('BORROW'), z.literal('BORROW RECALL'), z.literal('LENDING')])

export type IntentType = z.infer<typeof intentType>

export const notificationPayload = z.object({
  apy: z.string(),
  borrowAmount: z.string(),
  borrowSymbol: z.string(),
  chainId: ChainIdSchema,
  collateralAmount: z.string(),
  collateralSymbol: z.string(),
  intentType,
  ltv: z.string().optional(),
  raw: z.any(),
  status: notificationStatus,
  usdValue: z.number().optional(),
})

export type NotificationPayload = z.infer<typeof notificationPayload>

export type SendTelegramNotificationArgs = {
  payload?: NotificationPayload
  type: NotificationType
}

export const chainHashtagMap: Record<ChainId, string> = {
  1: '#ETH',
  8453: '#BASE 🔵',
  31337: '#FOUNDRY (why?)',
  34443: '#MODE 🟠',
  11155111: '#SEPOLIA (TESTING 🟢)',
}
