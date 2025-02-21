import { type Dispatch, type SetStateAction } from 'react'

import { WithdrawFunds } from '@/app/isolated/vault/_/WithdrawFunds'
import { Button } from '@/astaria/components/Button'

import { type ERC20 } from 'assets'

export const VaultsButton = ({
  erc20,
  hasVaultUsage,
  setWithdrawInProgress,
  withdrawInProgress,
}: {
  erc20: ERC20
  hasVaultUsage: boolean
  setWithdrawInProgress: Dispatch<SetStateAction<boolean>>
  withdrawInProgress: boolean
}) => {
  if (withdrawInProgress) {
    return (
      <Button disabled={withdrawInProgress} fullWidth>
        Withdrawal in progress
      </Button>
    )
  }

  return (
    <WithdrawFunds
      erc20={erc20}
      hasVaultUsage={hasVaultUsage}
      setWithdrawInProgress={setWithdrawInProgress}
      withdrawInProgress={withdrawInProgress}
    />
  )
}
