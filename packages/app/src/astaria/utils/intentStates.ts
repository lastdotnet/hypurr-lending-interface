import {
  type BorrowIntent,
  type BorrowIntentWithRecall,
  type LendIntent,
  type RatioLendIntent,
} from '@/astaria/types-internal/intent-schemas'

export type SupportedIntents = BorrowIntent | BorrowIntentWithRecall | LendIntent | RatioLendIntent

export const isRecallIntent = (intent: SupportedIntents): intent is BorrowIntentWithRecall =>
  'borrower' in intent || 'recallEndTime' in intent || 'recallStartTime' in intent

export const isBeingRecalled = (intent: SupportedIntents): intent is BorrowIntentWithRecall =>
  isRecallIntent(intent) && intent.isRecall

export const isLendIntent = (intent: SupportedIntents): intent is LendIntent =>
  'maxAmount' in intent || 'minAmount' in intent || 'minAPY' in intent

export const isRatioLendIntent = (intent: SupportedIntents): intent is RatioLendIntent =>
  'minCollateralAmount' in intent && 'collateralToDebtRatio' in intent && 'apy' in intent

export const isBorrowIntent = (intent: BorrowIntent | BorrowIntentWithRecall | LendIntent): intent is BorrowIntent =>
  'isRecall' in intent
