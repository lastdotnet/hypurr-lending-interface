import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { SeasonLeaderboard } from '../../logic/useSeasonLeaderboard'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { shortenAddress } from '@/ui/utils/shortenAddress'
import { PointsCell } from '@/ui/molecules/data-table/components/PointsCell'

interface Props {
  seasonLeaderboard?: SeasonLeaderboard[]
}

export function LeaderboardTable({ seasonLeaderboard }: Props) {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-6 py-4">
      <Typography variant="h3" className="text-lg" gradient>
        Leaderboard
      </Typography>

      <ResponsiveDataTable
        gridTemplateColumnsClassName="grid-cols-[1fr_2fr_2fr_1fr] md:grid-cols-[1fr_3fr_2fr_2fr_2fr]"
        columnDefinition={{
          week: {
            header: 'Ranking',
            headerAlign: 'left',
            showOnMobile: true,
            renderCell: ({ ranking }) => (
              <div>
                <div className="flex w-full flex-row justify-start pl-3 text-sm">{ranking || 0}</div>
              </div>
            ),
          },
          user: {
            header: 'User',
            headerAlign: 'left',
            showOnMobile: true,
            renderCell: ({ walletAddress }) => (
              <div>
                <div className="flex w-full flex-row justify-center text-sm md:justify-start md:pl-3">
                  {shortenAddress(walletAddress, { startLength: 5, endLength: 3 })}
                </div>
              </div>
            ),
          },
          points: {
            header: 'Points',
            headerAlign: 'left',
            renderCell: ({ points }, mobileViewOptions) => (
              <PointsCell points={points} mobileViewOptions={mobileViewOptions} className="md:justify-start" />
            ),
          },
          referral: {
            header: 'Referral Points',
            headerAlign: 'left',
            renderCell: ({ referralPoints }, mobileViewOptions) => (
              <PointsCell
                points={referralPoints || 0}
                mobileViewOptions={mobileViewOptions}
                className="md:justify-start"
              />
            ),
          },
          totalPoints: {
            header: 'Total points',
            headerAlign: 'left',
            showOnMobile: true,
            renderCell: ({ points, referralPoints }, mobileViewOptions) => (
              <PointsCell
                points={points + Number(referralPoints || 0)}
                mobileViewOptions={mobileViewOptions}
                className="justify-center md:justify-start"
                gradient={true}
              />
            ),
          },
        }}
        data={seasonLeaderboard || []}
      />
    </Panel.Wrapper>
  )
}
