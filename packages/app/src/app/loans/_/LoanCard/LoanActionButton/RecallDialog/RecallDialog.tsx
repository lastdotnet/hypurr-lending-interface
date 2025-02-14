import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { CurrentDebt } from '@/app/loans/_/LoanCard/CurrentDebt'
import { RecallButton } from '@/app/loans/_/LoanCard/LoanActionButton/RecallDialog/RecallButton'
import { useWriteRecall } from '@/app/loans/_/LoanCard/LoanActionButton/RecallDialog/useWriteRecall'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { Button } from '@/astaria/components/Button'
import { Card, CardLabelValue, CardSection } from '@/astaria/components/Card'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
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
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { Percent } from '@/astaria/components/Percent'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

const RecallDialogContent = ({ loan }: { loan: Loan }) => (
  <Card receiptStyle>
    <CardSection>
      <CardLabelValue
        label="Recalling"
        value={
          <CurrencyAmountWrapper>
            <ERC20Image erc20={loan.debt} />
            <CurrentDebt apy={loan.apy} className="text-2xl font-medium" erc20={loan.debt} startTime={loan.startTime} />
          </CurrencyAmountWrapper>
        }
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <CardLabelValue
          label="APY"
          orientation="horizontal"
          value={<Percent className="font-semibold" decimals={loan.debt.decimals} percent={loan.apy} />}
        />
      </div>
    </CardSection>
    <CardSection>
      <AssetDisplay asset={loan.asset} className="font-medium" triggerExtraWording="collateral" />
    </CardSection>
  </Card>
)

export const RecallDialog = ({
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
          Recall
        </Button>
      </DialogTrigger>
      <RecallDialogInner
        dialogOpen={dialogOpen}
        inView={inView}
        loan={loan}
        refetchLoans={refetchLoans}
        setDialogOpen={setDialogOpen}
      />
    </Dialog>
  )
}

export const RecallDialogInner = withChainCheckDialog(
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
    const [isFinishedRecall, setIsFinishedRecall] = useState(false)

    const {
      error: errorRecall,
      isConfirming: isConfirmingRecall,
      isLoading: isLoadingRecall,
      recall,
    } = useWriteRecall({
      enabled: chainId === loan.chainId && (inView || dialogOpen),
      isFinishedRecall,
      loan,
      onConfirmed: () => {
        refetchLoans?.()
        setIsFinishedRecall(true)
        setDialogOpen(false)
        sendSafaryClubEvent({
          chainId,
          eventName: 'Recall a Loan',
          eventType: 'onchain',
        })
      },
      showError: dialogOpen,
    })

    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Recall loan</DialogTitle>
        </DialogHeader>
        <DialogContent className="space-y-4">
          <RecallDialogContent loan={loan} />
          {errorRecall ? <DialogError error={errorRecall} /> : null}
        </DialogContent>
        <DialogActions>
          {(() => {
            if (chainId !== loan.chainId) {
              return <SwitchChainButton chainId={loan.chainId} fullWidth rounded="dialog" />
            }
            if (!isFinishedRecall) {
              return (
                <RecallButton
                  isConfirmingRecall={isConfirmingRecall}
                  isLoadingRecall={isLoadingRecall}
                  recall={recall}
                />
              )
            }
            return null
          })()}
        </DialogActions>
      </DialogContainer>
    )
  },
)
