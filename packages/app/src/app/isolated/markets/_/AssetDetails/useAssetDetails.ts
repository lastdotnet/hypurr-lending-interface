import { useInfiniteQuery } from '@tanstack/react-query'

import { sepolia } from 'viem/chains'

import { isVerifiedERC20 } from '@/app/isolated/intents/_/isVerifiedERC20'
import { ASSET_DETAILS_QUERY_KEY, PER_PAGE } from '@/app/isolated/markets/_/AssetDetails/fetching-constants'
import { getAssetDetails } from '@/app/isolated/markets/_/AssetDetails/getAssetDetails'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type GETAssetDetailsResponse } from '@/astaria/types-internal/market-schemas'

export const useAssetDetails = () => {
  const chainId = useChainId()
  const isTestnet = chainId === sepolia.id
  const { data, ...rest } = useInfiniteQuery({
    getNextPageParam: (lastPage: GETAssetDetailsResponse) => {
      if (!lastPage || lastPage.paging.onLastPage) {
        return undefined
      }
      return lastPage.paging.offset + PER_PAGE
    },
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => getAssetDetails({ isTestnet, limit: PER_PAGE, offset: pageParam }),
    queryKey: [ASSET_DETAILS_QUERY_KEY, { isTestnet }],
  })

  const assetDetails = data?.pages.flatMap((page) => page.assetDetails) ?? []

  return {
    assetDetails: assetDetails.filter((assetDetail) =>
      isVerifiedERC20({
        erc20: assetDetail.erc20,
      }),
    ),
    ...rest,
  }
}
