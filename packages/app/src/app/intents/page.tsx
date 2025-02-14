import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { ExpertMode } from '@/app/intents/_/ExpertMode'
import { IntentFeed } from '@/app/intents/_/IntentFeed'
import { TransmitIntentDialog } from '@/app/intents/_/TransmitIntent/TransmitIntentDialog'
import { INTENTS_QUERY_KEY, PER_PAGE } from '@/app/intents/_/constants'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'
import { getIntents } from '@/astaria/hooks/useIntents/getIntents'

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
    <Page className="space-y-5">
      <div className="flex items-center justify-end gap-5">
        <TransmitIntentDialog />
      </div>
      <div className="flex items-center justify-between gap-5">
        <Heading level={1}>Intents</Heading>
        <ExpertMode />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IntentFeed />
      </HydrationBoundary>
    </Page>
  )
}

export default IntentFeedPage
