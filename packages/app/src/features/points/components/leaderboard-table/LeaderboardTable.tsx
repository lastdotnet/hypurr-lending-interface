import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { SeasonLeaderboard } from '../../logic/useSeasonLeaderboard'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'

type Props = {
  seasonLeaderboard?: SeasonLeaderboard[]
}

export function LeaderboardTable({ seasonLeaderboard }: Props) {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-9 py-11">
      <Typography variant="h3" gradient>
        Leaderboard
      </Typography>

      <ResponsiveDataTable
        gridTemplateColumnsClassName="grid-cols-[repeat(4,_1fr)]"
        columnDefinition={{
          week: {
            header: 'Ranking',
            headerAlign: 'left',
            renderCell: ({ ranking }) => (
              <div>
                <div className="flex w-full flex-row justify-start pl-3">{ranking || 0}</div>
              </div>
            ),
          },
          points: {
            header: 'Points',
            headerAlign: 'center',
            renderCell: ({ points }) => (
              <div>
                <div className="flex w-full flex-row justify-center">{points}</div>
              </div>
            ),
          },
          referral: {
            header: 'Referral Points',
            headerAlign: 'center',
            renderCell: ({ referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-center">{referralPoints || 0}</div>
              </div>
            ),
          },
          totalPoints: {
            header: 'Total points',
            headerAlign: 'right',
            renderCell: ({ points, referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-end pr-3">{points + Number(referralPoints || 0)}</div>
              </div>
            ),
          },
        }}
        data={seasonLeaderboard || []}
      />
    </Panel.Wrapper>
  )
}
