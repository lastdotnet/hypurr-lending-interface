import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { MarketDetails } from '@/app/isolated-markets/_/MarketDetails'

import { AssetDetails } from '@/app/isolated-markets/_/AssetDetails'
import { ASSET_DETAILS_QUERY_KEY, PER_PAGE } from '@/app/isolated-markets/_/AssetDetails/fetching-constants'
import { getAssetDetails } from '@/app/isolated-markets/_/AssetDetails/getAssetDetails'
import { MARKET_DETAILS_QUERY_KEY } from '@/app/isolated-markets/_/MarketDetails/fetching-constants'
import { getMarketDetails } from '@/app/isolated-markets/_/MarketDetails/getMarketDetails'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'

const PAGE_TITLE = 'Astaria markets'
export const metadata = {
  title: PAGE_TITLE,
}

const MarketsPage = async () => {
  const queryClient = new QueryClient()
  const isTestnet = false

  await queryClient.prefetchQuery({
    queryFn: () => getMarketDetails({ isTestnet }),
    queryKey: [MARKET_DETAILS_QUERY_KEY, { isTestnet }],
  })
  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => getAssetDetails({ isTestnet, limit: PER_PAGE, offset: pageParam }),
    queryKey: [ASSET_DETAILS_QUERY_KEY, { isTestnet }],
  })

  return (
    <Page className="space-y-4">
      <Heading className="text-center" level={1}>
        {PAGE_TITLE}
      </Heading>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketDetails />
        <AssetDetails />
      </HydrationBoundary>
    </Page>
  )
}

export default MarketsPage
