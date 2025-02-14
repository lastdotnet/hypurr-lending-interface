import { AssetAmountAndName } from '@/astaria/components/AssetAmountAndName'
import { DialogSteps } from '@/astaria/components/Dialog'

import { type IntentAsset } from 'assets'

export const Steps = ({
  amount,
  asset,
  isConfirmingApprove,
  isFinishedApprove,
  isFinishedSign,
  isLoadingApprove,
  isLoadingSign,
}: {
  amount: bigint | undefined
  asset: IntentAsset
  isConfirmingApprove: boolean
  isFinishedApprove: boolean | undefined
  isFinishedSign: boolean
  isLoadingApprove: boolean
  isLoadingSign: boolean
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
          <AssetAmountAndName asset={asset} assetAmount={amount} className="font-bold" />
        </span>
      ),
    },
    {
      isFinished: isFinishedSign,
      isLoading: isLoadingSign,
      key: 'sign',
      label: <span>{isLoadingSign ? 'Signing' : 'Sign'} an intent message in your wallet</span>,
    },
  ]

  return <DialogSteps steps={steps} />
}
