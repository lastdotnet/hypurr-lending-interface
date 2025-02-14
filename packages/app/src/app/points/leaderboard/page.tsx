import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import Link from 'next/link'

import { Leaderboard } from '@/app/points/leaderboard/_'
import { PER_PAGE, POINTS_LEADERBOARD_QUERY_KEY } from '@/app/points/leaderboard/_/fetching-constants'
import { getLeaderboard } from '@/app/points/leaderboard/_/getLeaderboard'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'
import { Tabs, TabsList, TabsTrigger } from '@/astaria/components/Tabs'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'

const PAGE_TITLE = 'Points leaderboard'
export const metadata = {
  title: PAGE_TITLE,
}

const LeaderboardPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => getLeaderboard({ limit: PER_PAGE, offset: pageParam }),
    queryKey: [POINTS_LEADERBOARD_QUERY_KEY],
  })

  return (
    <Page className="space-y-4" size="narrow">
      <section>
        <Heading className="text-center" level={1}>
          {PAGE_TITLE}
        </Heading>
        <div className="text-center">
          <TextLink href={ROUTES.POINTS_HOW_TO_EARN}>How do I earn points?</TextLink>
        </div>
      </section>
      <Tabs defaultValue="leaderboard">
        <TabsList>
          <TabsTrigger asChild value="history">
            <Link href={ROUTES.POINTS_HISTORY}>Points history</Link>
          </TabsTrigger>
          <TabsTrigger value="leaderboard">Points leaderboard</TabsTrigger>
        </TabsList>
      </Tabs>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Leaderboard />
      </HydrationBoundary>
    </Page>
  )
}
export default LeaderboardPage
