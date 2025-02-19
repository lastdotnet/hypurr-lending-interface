import { Address, erc721Abi, getAbiItem, zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'

import { useChainId } from '@/astaria/hooks/useChainId'
import { useSimulateAndWriteTransaction } from '@/astaria/hooks/useSimulateAndWriteTransaction'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { getAssetsName } from '@/astaria/utils/getAssetsName'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { type ERC721 } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const useAllowanceERC721 = ({
  asset,
  enabled,
  showError,
}: {
  asset: ERC721
  enabled: boolean
  showError: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()
  const spender = getContractAddress({
    chainId,
    contractName: Contracts.Starport,
  })

  const {
    data: isApprovedForAll,
    isLoading: isLoadingApprovalStatus,
    refetch: refetchApprovalStatus,
  } = useReadContract({
    abi: [
      getAbiItem({
        abi: erc721Abi,
        name: 'isApprovedForAll',
      }),
    ],
    address: asset.address,
    args: [address ?? zeroAddress, spender],
    functionName: 'isApprovedForAll',
    query: {
      enabled: enabled && Boolean(address),
    },
  })
  const isFinished = !!isApprovedForAll

  const { writeContractAsync: approveERC721, ...rest } = useSimulateAndWriteTransaction({
    enabled: Boolean(enabled && !isFinished),
    onConfirmed: () => {
      refetchApprovalStatus()
    },
    showError,
    simulateData: {
      abi: [
        getAbiItem({
          abi: erc721Abi,
          name: 'setApprovalForAll',
        }),
      ],
      address: asset.address,
      args: [spender, true],
      functionName: 'setApprovalForAll',
    },
    title: `Allow access to your ${getAssetsName({ asset })}`,
  })

  return { approveERC721, isFinished, isLoadingApprovalStatus, ...rest }
}
