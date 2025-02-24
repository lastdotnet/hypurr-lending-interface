import { z } from 'zod'

// Conventions:
// - Use imperative tense for event names
// - If contract interaction, include { account: walletAddress }
// - If event references an asset, include { asset: tokenAddress:tokenId }

export const EVENT = {
  ACCOUNT_BLACKLIST_REJECT: 'ACCOUNT_BLACKLIST_REJECT',
  ACCOUNT_CONNECT_WALLET: 'ACCOUNT_CONNECT_WALLET',
  BORROW_INTENT_FILLED: 'BORROW_INTENT_FILLED',
  CTA_NEWSLETTER_SUBSCRIBE: 'CTA_NEWSLETTER_SUBSCRIBE',
  RECALL_BORROW_INTENT_FILLED: 'RECALL_BORROW_INTENT_FILLED',
} as const

export const payload = z.object({
  description: z.string(),
  text: z.string().optional(),
  title: z.string(),
  values: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
})

export const eventSchema = z.object({
  name: z.enum([
    EVENT.ACCOUNT_BLACKLIST_REJECT,
    EVENT.ACCOUNT_CONNECT_WALLET,
    EVENT.BORROW_INTENT_FILLED,
    EVENT.CTA_NEWSLETTER_SUBSCRIBE,
    EVENT.RECALL_BORROW_INTENT_FILLED,
  ]),
  payload,
})
