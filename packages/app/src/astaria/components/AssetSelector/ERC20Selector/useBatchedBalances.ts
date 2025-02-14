import { useQueries } from '@tanstack/react-query'

import type { Address } from 'viem'

import { create, keyResolver, windowedFiniteBatchScheduler } from '@yornaath/batshit'
import type { ChainId } from 'chains'
import memoize from 'lodash.memoize'

import { getERC20sWithBalance } from '@/astaria/components/AssetSelector/ERC20Selector/getERC20sWithBalance'
import { useChainId } from '@/astaria/hooks/useChainId'

const BATCH_SIZE = 50

const balancesBatchResolver = memoize(
  ({ chainId, userAddress }: { chainId: ChainId; userAddress: Address }) =>
    create({
      fetcher: async (tokenAddresses: Address[]) =>
        getERC20sWithBalance({
          chainId,
          tokenAddresses,
          userAddress,
        }),
      resolver: keyResolver('address'),
      scheduler: windowedFiniteBatchScheduler({
        maxBatchSize: BATCH_SIZE,
        windowMs: 10,
      }),
    }),
  ({ chainId, userAddress }) => `${chainId}:${userAddress}`,
)

export const useBatchedBalances = ({
  enabled,
  tokenAddresses,
  userAddress,
}: {
  enabled?: boolean
  tokenAddresses: Address[]
  userAddress: Address
}) => {
  const chainId = useChainId()

  return useQueries({
    combine: (results) => ({
      balances: results.map((result) => result.data),
      isPending: results.some((result) => result.isPending),
    }),
    queries: tokenAddresses.map((tokenAddress) => ({
      enabled: enabled && !!userAddress,
      queryFn: () => balancesBatchResolver({ chainId, userAddress }).fetch(tokenAddress),
      queryKey: ['batched-balances', { chainId, tokenAddress, userAddress }],
    })),
  })
}
