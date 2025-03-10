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
import { useWeeklyLeaderboard } from '../logic/useWeeklyLeaderboard'
import { useGetUserDetails } from '../logic/useGetUserDetails'

export function PointsView() {
  const account = useAccount()

  const {
    data: userDetails,
    isLoading: isUserDetailsLoading,
    isFetching: isUserDetailsFetching,
  } = useGetUserDetails(account)

  const { data: weeklyPoints, isLoading, isFetching } = useWeeklyPoints(userDetails?.user_id)

  const {
    data: weeklyLeaderboard,
    isLoading: isLeaderboardLoading,
    isFetching: isLeaderboardFetching,
  } = useWeeklyLeaderboard()

  const isAllLoading =
    (isLoading && isFetching) ||
    (isLeaderboardLoading && isLeaderboardFetching) ||
    (isUserDetailsLoading && isUserDetailsFetching)

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
              <SummaryPanel weeklyPoints={weeklyPoints} userDetails={userDetails} />
            </div>

            <div className="order-2 flex lg:order-3">
              <WeeklyTable weeklyPoints={weeklyPoints} />
            </div>

            <div className="order-3 flex lg:order-2">
              <SocialPanel />
            </div>

            <div className="order-4 flex">
              <ImageSharePanel userDetails={userDetails} />
            </div>
          </div>

          <LeaderboardTable weeklyLeaderboard={weeklyLeaderboard} />
        </>
      )}
    </PageLayout>
  )
}
