import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { SummaryPanel } from '../components/summary-panel/SummaryPanel'
import { SocialPanel } from '../components/social-panel/SocialPanel'
import { WeeklyTable } from '../components/weekly-table/WeeklyTable'
import { ImageSharePanel } from '../components/image-share-panel/ImageSharePanel'
import { LeaderboardTable } from '../components/leaderboard-table/LeaderboardTable'

export function PointsView() {
  return (
    <PageLayout className="max-w-6xl gap-4 px-3 lg:px-0">
      <Typography variant="h2" gradient className="mb-8">
        Points
      </Typography>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[5fr_3fr]">
        <div className="order-1 flex">
          <SummaryPanel />
        </div>

        <div className="order-2 flex lg:order-3">
          <WeeklyTable />
        </div>

        <div className="order-3 flex lg:order-2">
          <SocialPanel />
        </div>

        <div className="order-4 flex">
          <ImageSharePanel />
        </div>
      </div>

      <LeaderboardTable />
    </PageLayout>
  )
}
