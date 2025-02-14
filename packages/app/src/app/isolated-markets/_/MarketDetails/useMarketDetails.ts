import { useQuery } from '@tanstack/react-query'

import { sepolia } from 'viem/chains'

import { MARKET_DETAILS_QUERY_KEY } from '@/app/isolated-markets/_/MarketDetails/fetching-constants'
import { getMarketDetails } from '@/app/isolated-markets/_/MarketDetails/getMarketDetails'
import { useChainId } from '@/astaria/hooks/useChainId'

export const useMarketDetails = () => {
  const chainId = useChainId()
  const isTestnet = chainId === sepolia.id
  const { data: marketDetails, ...rest } = useQuery({
    queryFn: () => getMarketDetails({ isTestnet }),
    queryKey: [MARKET_DETAILS_QUERY_KEY, { isTestnet }],
  })

  return {
    marketDetails,
    ...rest,
  }
}
