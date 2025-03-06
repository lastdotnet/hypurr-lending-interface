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
import { useCurrentSeason } from '../logic/useCurrentSeason'
import { useSeasonLeaderboard } from '../logic/useSeasonLeaderboard'

export function PointsView() {
  const account = useAccount()

  const { data: season, isLoading: isSeasonLoading, isFetching: isSeasonFetching } = useCurrentSeason()
  const { data: weeklyPoints, isLoading, isFetching } = useWeeklyPoints(account)
  const {
    data: seasonLeaderboard,
    isLoading: isLeaderboardLoading,
    isFetching: isLeaderboardFetching,
  } = useSeasonLeaderboard(season?.id)

  const isAllLoading =
    (isLoading && isFetching) ||
    (isSeasonLoading && isSeasonFetching) ||
    (isLeaderboardLoading && isLeaderboardFetching)

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

          <LeaderboardTable seasonLeaderboard={seasonLeaderboard} />
        </>
      )}
    </PageLayout>
  )
}
