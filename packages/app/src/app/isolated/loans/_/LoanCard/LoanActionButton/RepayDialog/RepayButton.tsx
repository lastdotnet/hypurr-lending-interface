import { Button } from '@/astaria/components/Button'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'

import { type ERC20 } from 'assets'

export const RepayButton = ({
  debt,
  isConfirmingRepay,
  isLoadingRepay,
  repay,
}: {
  debt: ERC20
  isConfirmingRepay: boolean
  isLoadingRepay: boolean
  repay: () => void
}) => {
  const handleRepay = async () => {
    repay()
  }

  const repayAmount = formatCurrency({
    amount: debt.amount,
    decimals: debt.decimals,
    usdValue: debt.usdValue,
  }).trigger

  const buttonLabel = () => {
    if (isConfirmingRepay) {
      return `Confirming repaying ${repayAmount} ${debt.symbol}`
    }
    if (isLoadingRepay) {
      return `Repaying ${repayAmount} ${debt.symbol}`
    }
    return `Repay ${repayAmount} ${debt.symbol}`
  }

  return (
    <Button
      className="border-b-0 border-l-0 border-r-0"
      fullWidth
      loading={isLoadingRepay || isConfirmingRepay}
      onClick={handleRepay}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
