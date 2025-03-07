'use client'

import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { SummaryPanel } from '../components/summary-panel/SummaryPanel'
import { SocialPanel } from '../components/social-panel/SocialPanel'
import { WeeklyTable } from '../components/weekly-table/WeeklyTable'
import { ImageSharePanel } from '../components/image-share-panel/ImageSharePanel'
import { LeaderboardTable } from '../components/leaderboard-table/LeaderboardTable'
import { useWeeklyPoints } from '../logic/useWeeklyPoints'
import { useAccount } from '@/domain/hooks/useAccount'
import { PointsSkeleton } from '../components/skeleton/PointsSkeleton'
import { useGetUser } from '../logic/useGetUser'
import { useWeeklyLeaderboard } from '../logic/useWeeklyLeaderboard'

export function PointsView() {
  const account = useAccount()

  const { data } = useGetUser('0xF499A4dB77Be9E79bfD3F72d788035b4648F7937')

  const { data: weeklyPoints, isLoading, isFetching } = useWeeklyPoints('8b379836-1375-4683-bdd0-db00216d2dfc')

  const {
    data: weeklyLeaderboard,
    isLoading: isLeaderboardLoading,
    isFetching: isLeaderboardFetching,
  } = useWeeklyLeaderboard()

  const isAllLoading = (isLoading && isFetching) || (isLeaderboardLoading && isLeaderboardFetching)

  return (
    <PageLayout className="max-w-6xl gap-4 lg:px-3">
      <div>
        <Typography variant="h2" gradient className="mb-8">
          HypurrFi Points
        </Typography>
      </div>

      {isAllLoading ? (
        <PointsSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[5fr_3fr]">
            <div className="order-1 flex">
              <SummaryPanel weeklyPoints={weeklyPoints} />
            </div>

            <div className="order-2 flex lg:order-3">
              <WeeklyTable weeklyPoints={weeklyPoints} />
            </div>

            <div className="order-3 flex lg:order-2">
              <SocialPanel />
            </div>

            <div className="order-4 flex">
              <ImageSharePanel />
            </div>
          </div>

          <LeaderboardTable weeklyLeaderboard={weeklyLeaderboard} />
        </>
      )}
    </PageLayout>
  )
}
