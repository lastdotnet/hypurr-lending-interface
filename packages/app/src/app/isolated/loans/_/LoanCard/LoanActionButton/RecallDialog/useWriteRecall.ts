import { useState } from 'react'

import { useRecallTransactionData } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RecallDialog/useRecallTransactionData'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

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
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

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
    title: 'Recalling loan',
  })

  return { recall, ...rest }
}
