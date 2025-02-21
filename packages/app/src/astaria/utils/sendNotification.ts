'use server'

import { foundry, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'
import { Telegram } from 'puregram'

import { ENV_SERVER } from '@/astaria/constants/environmentServer'
import {
  MINIMUM_USD_VALUE,
  NotificationChannel,
  type NotificationPayload,
  NotificationType,
  type SendTelegramNotificationArgs,
  chainHashtagMap,
  notificationPayload,
} from '@/astaria/constants/notifications'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'

const telegram = Telegram.fromToken(ENV_SERVER.TELEGRAM_BOT_TOKEN)

function shouldNotifyGlobalThresholds({
  chainId,
  usdValue,
}: {
  chainId: ChainId
  usdValue?: number
}) {
  // return true; // Local development

  // Only notify in production
  if (ENV_SERVER.NODE_ENV !== 'production' || ENV_SERVER.VERCEL_ENV !== 'production') {
    return false
  }

  // Bail if USD value is not defined
  if (typeof usdValue === 'undefined') {
    return false
  }

  // Ignore testnet and foundry
  const IGNORED_CHAIN_IDS = [sepolia.id, foundry.id] as Partial<ChainId>[]
  if (IGNORED_CHAIN_IDS.includes(chainId)) {
    return false
  }

  // USD value or less than threshold
  if (usdValue < MINIMUM_USD_VALUE) {
    return false
  }

  return true
}

type SendNotificationArgs = {
  channels: NotificationChannel[]
  payload?: NotificationPayload
  type: NotificationType
}

export async function sendNotification({ channels, payload, type }: SendNotificationArgs) {
  const { chainId, usdValue } = notificationPayload.parse(payload)

  if (!shouldNotifyGlobalThresholds({ chainId, usdValue })) {
    return
  }

  // eslint-disable-next-line no-console
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('Sending notification:', {
    channels,
    payload,
    type,
  })

  const results = []

  if (channels.includes(NotificationChannel.TELEGRAM)) {
    results.push(
      await sendTelegramNotification({
        payload,
        type,
      }),
    )
  }

  return results
}

function getLink({
  chainId,
  intent,
}: {
  chainId: ChainId
  intent: BorrowIntent | LendIntent
}) {
  return `[Link ↗](https://astaria.xyz/i/${intent?.shortId}?utm_source=tg) | ${chainHashtagMap[chainId]}`
}

async function sendTelegramNotification({ payload, type }: SendTelegramNotificationArgs) {
  const {
    apy, // minAPY for LendIntent, endRate for BorrowIntent, BorrowIntentWithRecall
    borrowAmount,
    borrowSymbol,
    chainId,
    collateralAmount,
    collateralSymbol,
    intentType,
    ltv, // BorrowIntent, LendIntent, BorrowIntentWithRecall
    raw,
    status, // BORROW, BORROW RECALL, LENDING
  } = notificationPayload.parse(payload)

  const link = getLink({ chainId, intent: raw })

  let notificationMarkdownString = ''

  if (type === NotificationType.INTENT_CREATED || type === NotificationType.INTENT_FILLED) {
    notificationMarkdownString = `#${intentType.toUpperCase()} INTENT ${status.toUpperCase()}
${borrowAmount} $${borrowSymbol} with ${collateralAmount} $${collateralSymbol} as collateral${ltv ? ` (${ltv}% LTV)` : ''}
${intentType === 'LENDING' ? 'MIN APY' : 'MAX APY'}: ${apy}%
${link}`
  } else if (type === NotificationType.HIGH_APY) {
    notificationMarkdownString = `#BORROW INTENT HIGH APY 💰
${borrowAmount} $${borrowSymbol} with ${collateralAmount} $${collateralSymbol} as collateral${ltv ? ` (${ltv}% LTV)` : ''}
CURRENT APY: ${apy}% 🔥
${link}`
  } else if (type === NotificationType.HIGHER_APY) {
    notificationMarkdownString = `#BORROW INTENT HIGHER APY 🤑
${borrowAmount} $${borrowSymbol} with ${collateralAmount} $${collateralSymbol} as collateral${ltv ? ` (${ltv}% LTV)` : ''}
CURRENT APY: ${apy}% 🔥🔥
${link}`
  } else if (type === NotificationType.HIGHER_APY_LAST_CHANCE) {
    notificationMarkdownString = `#BORROW HIGHER APY *LAST CHANCE* 🚀
${borrowAmount} $${borrowSymbol} with ${collateralAmount} $${collateralSymbol} as collateral${ltv ? ` (${ltv}% LTV)` : ''}
CURRENT APY: ${apy}% 🔥🔥🔥
${link}`
  }

  // eslint-disable-next-line no-console
  console.log('Markdown notification string: ', notificationMarkdownString)

  const response = await telegram.api.sendMessage({
    chat_id: ENV_SERVER.TELEGRAM_EVENTS_CHAT_ID,
    link_preview_options: {
      is_disabled: true,
      // prefer_large_media: true,
      // show_above_text: true,
    },
    parse_mode: 'Markdown',
    text: notificationMarkdownString,
  })

  // eslint-disable-next-line no-console
  console.log('Telegram response: ', response)

  return response
}
