import { AssetAmountAndName } from '@/astaria/components/AssetAmountAndName'
import { DialogSteps } from '@/astaria/components/Dialog'

import { type ERC20Asset } from 'assets'

export const Steps = ({
  erc20Asset,
  isConfirmingApprove,
  isConfirmingDeployVault,
  isConfirmingDeposit,
  isFinishedDeployVault,
  isLoadingApprove,
  isLoadingDeployVault,
  isLoadingDeposit,
}: {
  erc20Asset: ERC20Asset
  isConfirmingApprove: boolean
  isConfirmingDeployVault: boolean
  isConfirmingDeposit: boolean
  isFinishedDeployVault: boolean
  isLoadingApprove: boolean
  isLoadingDeployVault: boolean
  isLoadingDeposit: boolean
}) => {
  const steps = [
    {
      isConfirming: isConfirmingDeployVault,
      isFinished: isFinishedDeployVault,
      isLoading: isLoadingDeployVault,
      key: 'deploy-vault',
      label: isConfirmingDeployVault || isLoadingDeployVault ? 'Deploying vault' : 'Deploy vault',
    },
    {
      isConfirming: isConfirmingApprove || isConfirmingDeposit,
      isLoading: isLoadingApprove || isLoadingDeposit,
      key: 'deposit',
      label: (
        <span>
          {isConfirmingDeposit || isLoadingDeposit ? 'Depositing' : 'Deposit'}{' '}
          <AssetAmountAndName asset={erc20Asset} className="font-bold" />
        </span>
      ),
    },
  ]

  return <DialogSteps steps={steps} />
}
