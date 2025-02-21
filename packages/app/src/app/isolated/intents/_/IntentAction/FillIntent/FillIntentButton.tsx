import { Button } from '@/astaria/components/Button'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'

export const FillIntentButton = ({
  fillIntent,
  intent,
  isConfirmingFillIntent,
  isLoadingFillIntent,
}: {
  fillIntent: () => void
  intent: BorrowIntent | LendIntent
  isConfirmingFillIntent: boolean
  isLoadingFillIntent: boolean
}) => {
  const handleFillIntent = async () => {
    fillIntent()
  }

  const lendAmount = formatCurrency({
    amount: intent.borrow.amount,
    decimals: intent.borrow.decimals,
    usdValue: intent.borrow.usdValue,
  }).trigger

  const buttonLabel = () => {
    if (isConfirmingFillIntent) {
      return `Confirming ${getIntentCopy({ borrow: 'lending', intent, lend: 'borrowing' })} ${lendAmount} ${intent.borrow.symbol}`
    }
    if (isLoadingFillIntent) {
      return `${getIntentCopy({ borrow: 'Lending', intent, lend: 'Borrowing' })} ${lendAmount} ${intent.borrow.symbol}`
    }
    return `${getIntentCopy({ borrow: 'Lend', intent, lend: 'Borrow' })} ${lendAmount} ${intent.borrow.symbol}`
  }

  return (
    <Button
      className="border-b-0 border-l-0 border-r-0"
      fullWidth
      loading={isLoadingFillIntent || isConfirmingFillIntent}
      onClick={handleFillIntent}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
