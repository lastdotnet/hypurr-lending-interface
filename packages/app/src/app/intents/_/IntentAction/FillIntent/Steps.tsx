import { AssetAmountAndName } from '@/astaria/components/AssetAmountAndName'
import { DialogSteps } from '@/astaria/components/Dialog'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'

export const Steps = ({
  intent,
  isConfirmingApprove,
  isConfirmingFillIntent,
  isFinishedApprove,
  isFinishedFillIntent,
  isLoadingApprove,
  isLoadingFillIntent,
}: {
  intent: BorrowIntent | LendIntent
  isConfirmingApprove: boolean
  isConfirmingFillIntent: boolean
  isFinishedApprove: boolean | undefined
  isFinishedFillIntent: boolean
  isLoadingApprove: boolean
  isLoadingFillIntent: boolean
}) => {
  const steps = [
    {
      isConfirming: isConfirmingApprove,
      isFinished: isFinishedApprove,
      isLoading: isLoadingApprove,
      key: 'allow-access',
      label: (
        <span>
          {isLoadingApprove ? 'Allowing' : 'Allow'} access to your{' '}
          <AssetAmountAndName asset={intent.borrow} className="font-bold" />
        </span>
      ),
    },
    {
      isConfirming: isConfirmingFillIntent,
      isFinished: isFinishedFillIntent,
      isLoading: isLoadingFillIntent,
      key: 'fill-intent',
      label: (
        <span>
          {isLoadingFillIntent || isConfirmingFillIntent
            ? getIntentCopy({ borrow: 'Lending', intent, lend: 'Borrowing' })
            : getIntentCopy({ borrow: 'Lend', intent, lend: 'Borrow' })}{' '}
          <AssetAmountAndName asset={intent.borrow} className="font-bold" />
        </span>
      ),
    },
  ]

  return <DialogSteps steps={steps} />
}
