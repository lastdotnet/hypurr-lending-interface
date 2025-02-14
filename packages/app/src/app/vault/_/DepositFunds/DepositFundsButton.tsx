import { Button } from '@/astaria/components/Button'

import { type ERC20Asset } from 'assets'

export const DepositFundsButton = ({
  approve,
  deployVault,
  erc20Asset,
  isConfirmingApprove,
  isConfirmingDeployVault,
  isConfirmingDeposit,
  isFinishedApprove,
  isFinishedDeployVault,
  isFinishedDeposit,
  isLoadingApprove,
  isLoadingDeployVault,
  isLoadingDeposit,
}: {
  approve: () => void
  deployVault: () => void
  erc20Asset: ERC20Asset
  isConfirmingApprove: boolean
  isConfirmingDeployVault: boolean
  isConfirmingDeposit: boolean
  isFinishedApprove: boolean | undefined
  isFinishedDeployVault: boolean
  isFinishedDeposit: boolean
  isLoadingApprove: boolean
  isLoadingDeployVault: boolean
  isLoadingDeposit: boolean
}) => {
  const symbol = erc20Asset.symbol
  if (!isFinishedDeployVault) {
    return (
      <Button
        className="border-b-0 border-l-0 border-r-0"
        fullWidth
        loading={isLoadingDeployVault || isConfirmingDeployVault}
        onClick={() => {
          deployVault()
        }}
        rounded="dialog"
      >
        {(() => {
          if (isConfirmingDeployVault) {
            return 'Confirming vault deployment'
          }
          if (isLoadingDeployVault) {
            return 'Deploying vault'
          }
          return 'Deploy vault'
        })()}
      </Button>
    )
  }
  if (!isFinishedApprove) {
    return (
      <Button
        className="border-b-0 border-l-0 border-r-0"
        fullWidth
        loading={isLoadingApprove || isConfirmingApprove}
        onClick={async () => {
          approve()
        }}
        rounded="dialog"
      >
        {(() => {
          if (isConfirmingDeployVault) {
            return `Confirming access to your ${symbol}`
          }
          if (isLoadingDeployVault) {
            return `Approving ${symbol}`
          }
          return `Approve ${symbol}`
        })()}
      </Button>
    )
  }
  if (!isFinishedDeposit) {
    return (
      <Button
        className="border-b-0 border-l-0 border-r-0"
        form="depositForm"
        fullWidth
        loading={isLoadingDeposit || isConfirmingDeposit}
        rounded="dialog"
        type="submit"
      >
        {(() => {
          if (isConfirmingDeployVault) {
            return `Confirming deposit of your ${symbol}`
          }
          if (isLoadingDeployVault) {
            return `Depositing ${symbol}`
          }
          return `Deposit ${symbol}`
        })()}
      </Button>
    )
  }
  return null
}
