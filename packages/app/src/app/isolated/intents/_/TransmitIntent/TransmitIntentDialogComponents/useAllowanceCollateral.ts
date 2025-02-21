import { useAllowanceERC20 } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceERC20'
import { useAllowanceERC721 } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceERC721'
import { Contracts } from '@/astaria/types-internal/contract-types'

import { type Asset, type ERC20, type ERC721, isERC20Asset, isERC721Asset } from 'assets'

export const useAllowanceCollateral = ({
  asset,
  enabled = true,
  showError = true,
}: {
  asset: Asset
  enabled?: boolean
  showError?: boolean
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
    enabled: enabled && isERC20Asset(asset),
    erc20: asset as ERC20,
    showError,
    spenderContractName: Contracts.Starport,
  })
  const {
    approveERC721,
    error: errorApproveERC721,
    isConfirming: isConfirmingApproveERC721,
    isFinished: isFinishedApproveERC721,
    isLoading: isLoadingApproveERC721,
    isLoadingApprovalStatus: isLoadingApprovalStatusApproveERC721,
  } = useAllowanceERC721({
    asset: asset as ERC721,
    enabled: enabled && isERC721Asset(asset),
    showError,
  })

  const approve = isERC20Asset(asset) ? approveERC20 : approveERC721
  const errorApprove = isERC20Asset(asset) ? errorApproveERC20 : errorApproveERC721
  const isFinishedApprove = isERC20Asset(asset) ? isFinishedApproveERC20 : isFinishedApproveERC721
  const isConfirmingApprove = isERC20Asset(asset) ? isConfirmingApproveERC20 : isConfirmingApproveERC721
  const isLoadingApprove = isERC20Asset(asset)
    ? isLoadingApproveERC20 || isLoadingApprovalStatusApproveERC20
    : isLoadingApproveERC721 || isLoadingApprovalStatusApproveERC721

  return {
    approve,
    errorApprove,
    isConfirmingApprove,
    isFinishedApprove,
    isLoadingApprove,
    needsAllowanceReset,
  }
}
