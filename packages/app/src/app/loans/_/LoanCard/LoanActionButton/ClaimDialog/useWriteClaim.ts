import { useState } from 'react'

import { useAccount } from 'wagmi'

import { useClaimTransactionData } from '@/app/loans/_/LoanCard/LoanActionButton/ClaimDialog/useClaimTransactionData'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Loan } from '@/astaria/types-internal/loan-schemas'

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
  const { address } = useAccount()
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
    title: `Claiming loan`,
  })

  return { claim, ...rest }
}
