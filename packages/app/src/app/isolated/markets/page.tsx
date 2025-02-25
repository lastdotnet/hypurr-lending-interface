import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { MarketDetails } from '@/app/isolated/markets/_/MarketDetails'

import { AssetDetails } from '@/app/isolated/markets/_/AssetDetails'
import { ASSET_DETAILS_QUERY_KEY, PER_PAGE } from '@/app/isolated/markets/_/AssetDetails/fetching-constants'
import { getAssetDetails } from '@/app/isolated/markets/_/AssetDetails/getAssetDetails'
import { MARKET_DETAILS_QUERY_KEY } from '@/app/isolated/markets/_/MarketDetails/fetching-constants'
import { getMarketDetails } from '@/app/isolated/markets/_/MarketDetails/getMarketDetails'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

const PAGE_TITLE = 'Isolated markets'
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
    <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
      <div className="flex flex-row items-center gap-4">
        <Typography variant="h2" gradient>
          {PAGE_TITLE}
        </Typography>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketDetails />
        <AssetDetails />
      </HydrationBoundary>
    </PageLayout>
  )
}

export default MarketsPage
