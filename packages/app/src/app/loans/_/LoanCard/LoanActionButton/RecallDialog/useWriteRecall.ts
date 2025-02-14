import { useState } from 'react'

import { useAccount } from 'wagmi'

import { useRecallTransactionData } from '@/app/loans/_/LoanCard/LoanActionButton/RecallDialog/useRecallTransactionData'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Loan } from '@/astaria/types-internal/loan-schemas'

export const useWriteRecall = ({
  enabled,
  isFinishedRecall,
  loan,
  onConfirmed,
  showError,
}: {
  enabled?: boolean
  isFinishedRecall: boolean
  loan: Loan
  onConfirmed?: () => void
  showError: boolean
}) => {
  const { address } = useAccount()
  const [isRecalling, setIsRecalling] = useState(false)

  const { data: recallTransactionData } = useRecallTransactionData({
    address,
    loan,
  })

  const { writeContract: recall, ...rest } = useSimulateAndWriteTransaction({
    enabled: enabled && Boolean(!!recallTransactionData && !isRecalling && !isFinishedRecall),
    onConfirmed: () => {
      onConfirmed?.()
      setIsRecalling(false)
    },
    onMutate: () => {
      setIsRecalling(true)
    },
    showError,
    simulateData: recallTransactionData,
    title: `Recalling loan`,
  })

  return { recall, ...rest }
}
