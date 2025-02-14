import { useQuery } from '@tanstack/react-query'

import { useChainId } from '@/astaria/hooks/useChainId'
import { fetchUSDValue } from '@/astaria/utils/fetchUSDValue'

import { type ERC20, type ERC20Asset } from 'assets'

export const useUSDValue = (asset: ERC20 | ERC20Asset) => {
  const chainId = useChainId()
  const { data, ...rest } = useQuery({
    enabled: Boolean(chainId),
    queryFn: () => fetchUSDValue({ address: asset.address, chainId }),
    queryKey: ['usd-value', { asset: asset.address, chainId }],
  })

  return {
    data,
    ...rest,
  }
}
