import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { isLendIntent } from '@/astaria/utils/intentStates'

export const getIntentCopy = ({
  borrow,
  intent,
  lend,
}: {
  borrow: string
  intent: BorrowIntent | LendIntent
  lend: string
}) => {
  if (isLendIntent(intent)) {
    return lend
  }
  return borrow
}
