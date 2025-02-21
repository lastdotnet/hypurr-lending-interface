import { useState } from 'react'

import { useClaimTransactionData } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/ClaimDialog/useClaimTransactionData'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export const useWriteClaim = ({
  enabled,
  isFinishedClaim,
  loan,
  onConfirmed,
  showError,
}: {
  enabled?: boolean
  isFinishedClaim: boolean
  loan: Loan
  onConfirmed?: () => void
  showError: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const [isClaiming, setIsClaiming] = useState(false)

  const { data: claimTransactionData } = useClaimTransactionData({
    address,
    loan,
  })

  const { writeContract: claim, ...rest } = useSimulateAndWriteTransaction({
    enabled: enabled && Boolean(!!claimTransactionData && !isClaiming && !isFinishedClaim),
    onConfirmed: () => {
      onConfirmed?.()
      setIsClaiming(false)
    },
    onMutate: () => {
      setIsClaiming(true)
    },
    showError,
    simulateData: claimTransactionData,
    title: 'Claiming loan',
  })

  return { claim, ...rest }
}
