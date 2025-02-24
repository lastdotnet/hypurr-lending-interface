import { Address, erc20Abi, getAbiItem, parseAbi, zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'

import { UINT256MAX } from 'common'

import { isUSDTAddress } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/isUSDTAddress'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { type Contracts } from '@/astaria/types-internal/contract-types'
import { getAssetsName } from '@/astaria/utils/getAssetsName'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { wagmiConfig } from '@/astaria/config/wagmi'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type ERC20 } from 'assets'

const USDT_APPROVE_ABI = parseAbi(['function approve(address _spender, uint _value) public'] as const)

const ERC20_APPROVE_ABI = [
  getAbiItem({
    abi: erc20Abi,
    name: 'approve',
  }),
]

const getIsFinished = ({
  allowance,
  amount,
}: {
  allowance: bigint | undefined
  amount: bigint
}) => {
  if (typeof allowance === 'bigint' && amount !== undefined) {
    return allowance >= amount
  }
  return false
}

export const useAllowanceERC20 = ({
  enabled,
  erc20,
  showError,
  spenderContractName,
}: {
  enabled: boolean
  erc20: ERC20
  showError: boolean
  spenderContractName: Contracts
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()
  const spender = getContractAddress({
    chainId,
    contractName: spenderContractName,
  })

  const {
    data: allowance,
    isLoading: isLoadingApprovalStatus,
    refetch: refetchApprovalStatus,
  } = useReadContract({
    abi: erc20Abi,
    address: erc20.address,
    args: [address ?? zeroAddress, spender],
    functionName: 'allowance',
    query: {
      enabled,
    },
    config: wagmiConfig,
  })

  const isFinished = getIsFinished({ allowance, amount: erc20.amount })

  const isUSDTAsset = isUSDTAddress({
    address: erc20.address,
    chainId,
  })

  const needsAllowanceReset = isUSDTAsset && allowance !== 0n && !isFinished

  const approveAmount = needsAllowanceReset ? 0n : UINT256MAX

  const abi = isUSDTAsset ? USDT_APPROVE_ABI : ERC20_APPROVE_ABI

  const { writeContractAsync: approveERC20, ...rest } = useSimulateAndWriteTransaction({
    enabled: Boolean(enabled && !isFinished),
    onConfirmed: () => {
      refetchApprovalStatus()
    },
    showError,
    simulateData: {
      abi,
      address: erc20.address,
      args: [spender, approveAmount],
      functionName: 'approve',
    },
    title: `Allow access to your ${getAssetsName({ asset: erc20 })}`,
  })

  return {
    approveERC20,
    isFinished,
    isLoadingApprovalStatus,
    needsAllowanceReset,
    ...rest,
  }
}
