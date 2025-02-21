import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ApproveCollateralButton } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/ApproveCollateralButton'
import { NeedsAllowanceResetWarning } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/NeedsAllowanceResetWarning'
import { RepayButton } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog/RepayButton'
import { Steps } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog/Steps'
import { useAllowanceDebt } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog/useAllowanceDebt'
import { useRepayTransactionData } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog/useRepayTransactionData'
import { useWriteRepay } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/RepayDialog/useWriteRepay'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { ERC20Display } from '@/astaria/components/AssetDisplay/ERC20Display'
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
import { Percent } from '@/astaria/components/Percent'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type Loan } from '@/astaria/types-internal/loan-schemas'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

const RepayDialogContent = ({
  loan,
  repayAmount,
}: {
  loan: Loan
  repayAmount: bigint
}) => (
  <Card receiptStyle>
    <CardSection>
      <CardLabelValue
        label="Repaying"
        value={
          <ERC20Display
            className="text-2xl font-medium"
            erc20={{ ...loan.debt, amount: repayAmount }}
            highPrecision
            linkAssetToBlockExplorer
          />
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
      <AssetDisplay asset={loan.asset} className="font-medium" highPrecision triggerExtraWording="collateral" />
    </CardSection>
  </Card>
)
export const RepayDialog = ({
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
          Repay in full
        </Button>
      </DialogTrigger>
      <RepayDialogInner
        dialogOpen={dialogOpen}
        inView={inView}
        loan={loan}
        refetchLoans={refetchLoans}
        setDialogOpen={setDialogOpen}
      />
    </Dialog>
  )
}

export const RepayDialogInner = withChainCheckDialog(
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
    const { primaryWallet: wallet } = useDynamicContext()

    const address = wallet?.address as Address | undefined

    const chainId = useChainId()
    const [isFinishedRepay, setIsFinishedRepay] = useState(false)

    const { data: repayTransactionData } = useRepayTransactionData({
      address,
      loan,
    })

    const debt = {
      ...loan.debt,
      amount: repayTransactionData?.bufferedAmount ?? loan.debt.amount,
    }

    const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove, needsAllowanceReset } =
      useAllowanceDebt({
        debt,
        enabled: chainId === loan.chainId && (inView || dialogOpen),
        showError: dialogOpen,
      })

    const {
      error: errorRepay,
      isConfirming: isConfirmingRepay,
      isLoading: isLoadingRepay,
      repay,
    } = useWriteRepay({
      enabled: chainId === loan.chainId && (inView || dialogOpen),
      isFinishedApprove,
      isFinishedRepay,
      loan,
      onConfirmed: () => {
        refetchLoans?.()
        setIsFinishedRepay(true)
        setDialogOpen(false)
        sendSafaryClubEvent({
          chainId,
          eventName: 'Repay a Loan',
          eventType: 'onchain',
        })
      },
      showError: dialogOpen,
    })

    const error = errorApprove || errorRepay

    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Repay loan</DialogTitle>
        </DialogHeader>
        <Steps
          debt={debt}
          isConfirmingApprove={isConfirmingApprove}
          isConfirmingRepay={isConfirmingRepay}
          isFinishedApprove={isFinishedApprove}
          isFinishedRepay={isFinishedRepay}
          isLoadingApprove={isLoadingApprove}
          isLoadingRepay={isLoadingRepay}
        />
        <DialogContent className="space-y-4">
          <RepayDialogContent loan={loan} repayAmount={debt.amount} />
          <p className="text-xs">
            You can only repay in full, no partial payments. Upon repayment of the loan, your original asset will be
            returned to your wallet.
          </p>
          {needsAllowanceReset ? <NeedsAllowanceResetWarning asset={loan.debt} /> : null}
          {error ? <DialogError error={error} /> : null}
        </DialogContent>
        <DialogActions>
          {(() => {
            if (chainId !== loan.chainId) {
              return <SwitchChainButton chainId={loan.chainId} fullWidth rounded="dialog" />
            }
            if (!isFinishedApprove) {
              return (
                <ApproveCollateralButton
                  approve={approve}
                  isConfirmingApprove={isConfirmingApprove}
                  isLoadingApprove={isLoadingApprove}
                />
              )
            }
            if (isFinishedApprove && !isFinishedRepay) {
              return (
                <RepayButton
                  debt={debt}
                  isConfirmingRepay={isConfirmingRepay}
                  isLoadingRepay={isLoadingRepay}
                  repay={repay}
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
