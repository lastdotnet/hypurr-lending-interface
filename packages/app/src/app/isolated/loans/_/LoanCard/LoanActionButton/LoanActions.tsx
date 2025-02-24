'use client'

import { useBalance } from 'wagmi'

import { ClaimDialog } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/ClaimDialog'
import { RecallDialog } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RecallDialog'
import { RepayDialog } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog'
import { getEnd } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/getEnd'
import { Button } from '@/astaria/components/Button'
import { CardActions, CardSection } from '@/astaria/components/Card'
import { NotEnoughBalance } from '@/astaria/components/NotEnoughBalance'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { wagmiConfig } from '@/astaria/config/wagmi'
import { type Loan, SourceType } from '@/astaria/types-internal/loan-schemas'
import { checkIfLoanIsExpired } from '@/astaria/utils/loans/checkIfLoanIsExpired'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export const LoanActions = ({
  loan,
  mock,
  refetchLoans,
  skeleton,
}: {
  loan: Loan | undefined
  mock?: boolean
  refetchLoans?: () => void
  skeleton: boolean | undefined
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const { data: balance, isPending: isPendingBalance } = useBalance({
    address,
    chainId: loan?.chainId,
    token: loan?.debt.address,
    config: wagmiConfig,
  })

  if (skeleton || isPendingBalance) {
    return (
      <CardActions>
        <Button disabled={mock} emphasis="medium" fullWidth>
          <SkeletonText />
        </Button>
      </CardActions>
    )
  }

  if (loan && loan.source === SourceType.BORROWER) {
    const isExpired = loan ? checkIfLoanIsExpired(getEnd(loan)) : undefined
    if (!loan.isClaimable && (mock || !isExpired)) {
      if (!balance || balance.value < loan.debt.amount) {
        return (
          <CardActions>
            <CardSection className="text-center">
              <NotEnoughBalance
                amountNeeded={loan.debt.amount}
                balance={balance?.value}
                chainId={loan.chainId}
                decimals={loan.debt.decimals}
                extraWords="to repay"
                symbol={loan.debt.symbol}
              />
            </CardSection>
          </CardActions>
        )
      }

      return (
        <CardActions>
          <RepayDialog disabled={mock} loan={loan} refetchLoans={refetchLoans} />
        </CardActions>
      )
    }
  }

  if (loan && loan.source === SourceType.LENDER) {
    if (loan.isClaimable) {
      return <ClaimDialog disabled={mock} loan={loan} refetchLoans={refetchLoans} />
    }
    if (!loan.isRecall) {
      if (loan.isRecallable) {
        return (
          <CardActions>
            <RecallDialog disabled={mock} loan={loan} refetchLoans={refetchLoans} />
          </CardActions>
        )
      }

      return (
        <CardActions>
          <Button disabled emphasis="medium" fullWidth>
            <span>
              Recall available in <TimeLeft endSeconds={loan.recallableAt} skeleton={skeleton} />
            </span>
          </Button>
        </CardActions>
      )
    }
  }

  return null
}
