import { AssetAmountAndName } from '@/astaria/components/AssetAmountAndName'
import { DialogSteps } from '@/astaria/components/Dialog'

import { type ERC20 } from 'assets'

export const Steps = ({
  debt,
  isConfirmingApprove,
  isConfirmingRepay,
  isFinishedApprove,
  isFinishedRepay,
  isLoadingApprove,
  isLoadingRepay,
}: {
  debt: ERC20
  isConfirmingApprove: boolean
  isConfirmingRepay: boolean
  isFinishedApprove: boolean | undefined
  isFinishedRepay: boolean
  isLoadingApprove: boolean
  isLoadingRepay: boolean
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
          <AssetAmountAndName asset={debt} className="font-bold" />
        </span>
      ),
    },
    {
      isConfirming: isConfirmingRepay,
      isFinished: isFinishedRepay,
      isLoading: isLoadingRepay,
      key: 'repay',
      label: (
        <span>
          {isConfirmingRepay || isLoadingRepay ? 'Repaying' : 'Repay'}{' '}
          <AssetAmountAndName asset={debt} className="font-bold" />
        </span>
      ),
    },
  ]

  return <DialogSteps steps={steps} />
}
