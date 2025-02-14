import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ClaimButton } from '@/app/loans/_/LoanCard/LoanActionButton/ClaimDialog/ClaimButton'
import { useWriteClaim } from '@/app/loans/_/LoanCard/LoanActionButton/ClaimDialog/useWriteClaim'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { Button } from '@/astaria/components/Button'
import { Card, CardLabelValue, CardSection } from '@/astaria/components/Card'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogError,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

const ClaimDialogContent = ({ loan }: { loan: Loan }) => (
  <Card receiptStyle>
    <CardSection>
      <CardLabelValue label="Claiming" value={<AssetDisplay asset={loan.asset} className="text-2xl font-medium" />} />
    </CardSection>
  </Card>
)

export const ClaimDialog = ({
  disabled,
  loan,
  refetchLoans,
}: {
  disabled?: boolean
  loan: Loan
  refetchLoans?: () => void
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { inView, ref } = useInView()

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button ref={ref} disabled={disabled} emphasis="medium" fullWidth>
          Claim
        </Button>
      </DialogTrigger>
      <ClaimDialogInner
        dialogOpen={dialogOpen}
        inView={inView}
        loan={loan}
        refetchLoans={refetchLoans}
        setDialogOpen={setDialogOpen}
      />
    </Dialog>
  )
}

export const ClaimDialogInner = withChainCheckDialog(
  ({
    dialogOpen,
    inView,
    loan,
    refetchLoans,
    setDialogOpen,
  }: {
    dialogOpen: boolean
    inView: boolean
    loan: Loan
    refetchLoans?: () => void
    setDialogOpen: Dispatch<SetStateAction<boolean>>
  }) => {
    const chainId = useChainId()
    const [isFinishedClaim, setIsFinishedClaim] = useState(false)

    const {
      claim,
      error: errorClaim,
      isConfirming: isConfirmingClaim,
      isLoading: isLoadingClaim,
    } = useWriteClaim({
      enabled: chainId === loan.chainId && (inView || dialogOpen),
      isFinishedClaim,
      loan,
      onConfirmed: () => {
        refetchLoans?.()
        setIsFinishedClaim(true)
        setDialogOpen(false)
      },
      showError: dialogOpen,
    })

    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Claim collateral</DialogTitle>
        </DialogHeader>
        <DialogContent className="space-y-4">
          <ClaimDialogContent loan={loan} />
          {errorClaim ? <DialogError error={errorClaim} /> : null}
        </DialogContent>
        <DialogActions>
          {(() => {
            if (chainId !== loan.chainId) {
              return <SwitchChainButton chainId={loan.chainId} fullWidth rounded="dialog" />
            }
            if (!isFinishedClaim) {
              return <ClaimButton claim={claim} isConfirmingClaim={isConfirmingClaim} isLoadingClaim={isLoadingClaim} />
            }
            return null
          })()}
        </DialogActions>
      </DialogContainer>
    )
  },
)
