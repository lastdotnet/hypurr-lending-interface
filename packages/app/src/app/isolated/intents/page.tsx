import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { ExpertMode } from '@/app/isolated/intents/_/ExpertMode'
import { IntentFeed } from '@/app/isolated/intents/_/IntentFeed'
import { TransmitIntentDialog } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialog'
import { INTENTS_QUERY_KEY, PER_PAGE } from '@/app/isolated/intents/_/constants'
import { getIntents } from '@/astaria/hooks/useIntents/getIntents'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

const IntentFeedPage = async () => {
  const queryClient = new QueryClient()

  const isExpertMode = false
  const isTestnet = false
  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getIntents({
        intentFilterParameters: {
          isExpertMode,
        },
        isTestnet,
        limit: PER_PAGE,
        offset: pageParam,
      }),
    queryKey: [INTENTS_QUERY_KEY, { isExpertMode, isTestnet }],
  })

  return (
    <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
      <div className="flex flex-row justify-between gap-4">
        <Typography variant="h2" gradient>
          Intents
        </Typography>
        <TransmitIntentDialog />
      </div>

      <div className="flex items-center justify-end gap-5">
        <ExpertMode />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <IntentFeed />
      </HydrationBoundary>
    </PageLayout>
  )
}

export default IntentFeedPage
