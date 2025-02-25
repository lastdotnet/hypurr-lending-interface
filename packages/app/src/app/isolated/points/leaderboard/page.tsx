import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import Link from 'next/link'

import { Leaderboard } from '@/app/isolated/points/leaderboard/_'
import { PER_PAGE, POINTS_LEADERBOARD_QUERY_KEY } from '@/app/isolated/points/leaderboard/_/fetching-constants'
import { getLeaderboard } from '@/app/isolated/points/leaderboard/_/getLeaderboard'
import { Tabs, TabsList, TabsTrigger } from '@/astaria/components/Tabs'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

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
    <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
      <div className="flex flex-row items-center justify-between gap-4">
        <Typography variant="h2" gradient>
          {PAGE_TITLE}
        </Typography>
        <div className="text-center">
          <TextLink href={ROUTES.POINTS_HOW_TO_EARN}>How do I earn points?</TextLink>
        </div>
      </div>
      <Tabs className="mx-auto max-w-sm" defaultValue="leaderboard">
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
    </PageLayout>
  )
}
export default LeaderboardPage
