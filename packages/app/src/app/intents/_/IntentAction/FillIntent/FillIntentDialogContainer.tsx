import { FillIntentButton } from '@/app/intents/_/IntentAction/FillIntent/FillIntentButton'
import { FillIntentContent } from '@/app/intents/_/IntentAction/FillIntent/FillIntentContent'
import { Steps } from '@/app/intents/_/IntentAction/FillIntent/Steps'
import { ApproveCollateralButton } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/ApproveCollateralButton'
import { NeedsAllowanceResetWarning } from '@/app/loans/_/LoanCard/LoanActionButton/NeedsAllowanceResetWarning'
import {
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogError,
  DialogHeader,
  DialogTitle,
} from '@/astaria/components/Dialog'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { useChainId } from '@/astaria/hooks/useChainId'
import {
  type BorrowIntent,
  type BorrowIntentWithRecall,
  type LendIntent,
} from '@/astaria/types-internal/intent-schemas'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'

import { type IntentAsset } from 'assets'

const FillIntentActions = ({
  approve,
  fillIntent,
  intent,
  isConfirmingApprove,
  isConfirmingFillIntent,
  isFinishedApprove,
  isFinishedFillIntent,
  isLoadingApprove,
  isLoadingFillIntent,
}: {
  approve: () => void
  fillIntent: () => void
  intent: BorrowIntent | BorrowIntentWithRecall | LendIntent
  isConfirmingApprove: boolean
  isConfirmingFillIntent: boolean
  isFinishedApprove: boolean | undefined
  isFinishedFillIntent: boolean
  isLoadingApprove: boolean
  isLoadingFillIntent: boolean
}) => {
  const chainId = useChainId()

  return (
    <DialogActions>
      {(() => {
        if (chainId !== intent.chainId) {
          return <SwitchChainButton chainId={intent.chainId} fullWidth rounded="dialog" />
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
        if (isFinishedApprove && !isFinishedFillIntent) {
          return (
            <FillIntentButton
              fillIntent={fillIntent}
              intent={intent}
              isConfirmingFillIntent={isConfirmingFillIntent}
              isLoadingFillIntent={isLoadingFillIntent}
            />
          )
        }
        return null
      })()}
    </DialogActions>
  )
}

export const FillIntentDialogContainer = ({
  approve,
  asset,
  error,
  fillIntent,
  intent,
  isConfirmingApprove,
  isConfirmingFillIntent,
  isFinishedApprove,
  isFinishedFillIntent,
  isLoadingApprove,
  isLoadingFillIntent,
  needsAllowanceReset,
}: {
  approve: () => void
  asset: IntentAsset
  error: Error | null
  fillIntent: () => void
  intent: BorrowIntent | BorrowIntentWithRecall | LendIntent
  isConfirmingApprove: boolean
  isConfirmingFillIntent: boolean
  isFinishedApprove: boolean | undefined
  isFinishedFillIntent: boolean
  isLoadingApprove: boolean
  isLoadingFillIntent: boolean
  needsAllowanceReset: boolean
}) => (
  <DialogContainer>
    <DialogHeader>
      <DialogTitle>{getIntentCopy({ borrow: 'Lend', intent, lend: 'Borrow' })}</DialogTitle>
    </DialogHeader>
    <Steps
      intent={intent}
      isConfirmingApprove={isConfirmingApprove}
      isConfirmingFillIntent={isConfirmingFillIntent}
      isFinishedApprove={isFinishedApprove}
      isFinishedFillIntent={isFinishedFillIntent}
      isLoadingApprove={isLoadingApprove}
      isLoadingFillIntent={isLoadingFillIntent}
    />
    <DialogContent>
      <FillIntentContent intent={intent} />
      <p className="text-xs">
        This loan is open indefinitely. After 24 hours you can start a recall auction, creating a new intent for someone
        else to service this loan. If no one fills that intent, the asset goes to into liquidation and up for auction.
      </p>
      {needsAllowanceReset ? <NeedsAllowanceResetWarning asset={asset} /> : null}
      {error ? <DialogError error={error} /> : null}
    </DialogContent>
    <FillIntentActions
      approve={approve}
      fillIntent={fillIntent}
      intent={intent}
      isConfirmingApprove={isConfirmingApprove}
      isConfirmingFillIntent={isConfirmingFillIntent}
      isFinishedApprove={isFinishedApprove}
      isFinishedFillIntent={isFinishedFillIntent}
      isLoadingApprove={isLoadingApprove}
      isLoadingFillIntent={isLoadingFillIntent}
    />
  </DialogContainer>
)
