import { useAllowanceERC20 } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceERC20'
import { Contracts } from '@/astaria/types-internal/contract-types'

import { type ERC20, isERC20Asset } from 'assets'

export const useAllowanceDeposit = ({
  enabled,
  erc20Asset,
  showError,
}: {
  enabled: boolean
  erc20Asset: ERC20
  showError: boolean
}) => {
  const {
    approveERC20,
    error: errorApproveERC20,
    isConfirming: isConfirmingApproveERC20,
    isFinished: isFinishedApproveERC20,
    isLoading: isLoadingApproveERC20,
    isLoadingApprovalStatus: isLoadingApprovalStatusApproveERC20,
    needsAllowanceReset,
  } = useAllowanceERC20({
    enabled: enabled && isERC20Asset(erc20Asset),
    erc20: erc20Asset,
    showError,
    spenderContractName: Contracts.Consideration,
  })

  return {
    approve: approveERC20,
    errorApprove: errorApproveERC20,
    isConfirmingApprove: isConfirmingApproveERC20,
    isFinishedApprove: isFinishedApproveERC20,
    isLoadingApprove: isLoadingApproveERC20 || isLoadingApprovalStatusApproveERC20,
    needsAllowanceReset,
  }
}
