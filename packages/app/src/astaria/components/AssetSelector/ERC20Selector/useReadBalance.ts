import { useQuery } from '@tanstack/react-query'

import type { Address } from 'viem'

import { getERC20sWithBalance } from '@/astaria/components/AssetSelector/ERC20Selector/getERC20sWithBalance'
import { useChainId } from '@/astaria/hooks/useChainId'

export const useReadBalance = ({
  enabled,
  tokenAddress,
  userAddress,
}: {
  enabled?: boolean
  tokenAddress: Address
  userAddress: Address
}) => {
  const chainId = useChainId()

  const { data, ...rest } = useQuery({
    enabled: enabled && !!userAddress,
    queryFn: async () =>
      await getERC20sWithBalance({
        chainId,
        tokenAddresses: [tokenAddress],
        userAddress,
      }),
    queryKey: ['read-balance', { chainId, tokenAddress, userAddress }],
  })

  return {
    balance: data ? data[0] : undefined,
    ...rest,
  }
}
