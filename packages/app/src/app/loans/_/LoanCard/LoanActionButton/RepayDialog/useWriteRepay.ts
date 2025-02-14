import { useState } from 'react'

import { useAccount } from 'wagmi'

import { useRepayTransactionData } from '@/app/loans/_/LoanCard/LoanActionButton/RepayDialog/useRepayTransactionData'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'

export const useWriteRepay = ({
  enabled,
  isFinishedApprove,
  isFinishedRepay,
  loan,
  onConfirmed,
  showError,
}: {
  enabled?: boolean
  isFinishedApprove: boolean
  isFinishedRepay: boolean
  loan: Loan
  onConfirmed?: () => void
  showError: boolean
}) => {
  const { address } = useAccount()
  const [isRepaying, setIsRepaying] = useState(false)

  const { data: repayTransactionData } = useRepayTransactionData({
    address,
    loan,
  })

  const repayAmount = repayTransactionData?.bufferedAmount ?? loan.debt.amount

  const loanAmount = formatCurrency({
    amount: repayAmount,
    decimals: loan.debt.decimals,
    usdValue: loan.debt.usdValue,
  }).trigger

  const { writeContract: repay, ...rest } = useSimulateAndWriteTransaction({
    enabled:
      enabled && Boolean(!!repayTransactionData?.functionData && !isRepaying && !isFinishedRepay && isFinishedApprove),
    onConfirmed: () => {
      onConfirmed?.()
      setIsRepaying(false)
    },
    onMutate: () => {
      setIsRepaying(true)
    },
    showError,
    simulateData: repayTransactionData?.functionData,
    title: `Repay ${loanAmount} ${loan.debt.symbol}`,
  })

  return { repay, ...rest }
}
