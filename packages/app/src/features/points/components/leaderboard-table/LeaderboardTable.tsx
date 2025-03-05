import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { SeasonLeaderboard } from '../../logic/useSeasonLeaderboard'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { shortenAddress } from '@/ui/utils/shortenAddress'

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
        gridTemplateColumnsClassName="grid-cols-[1fr_3fr_2fr_2fr_2fr]"
        columnDefinition={{
          week: {
            header: 'Ranking',
            headerAlign: 'left',
            renderCell: ({ ranking }) => (
              <div>
                <div className="flex w-full flex-row justify-start pl-3 text-sm">{ranking || 0}</div>
              </div>
            ),
          },
          user: {
            header: 'User',
            headerAlign: 'left',
            renderCell: ({ walletAddress }) => (
              <div>
                <div className="flex w-full flex-row justify-start pl-3 text-sm">
                  {shortenAddress(walletAddress, { startLength: 5, endLength: 3 })}
                </div>
              </div>
            ),
          },
          points: {
            header: 'Points',
            headerAlign: 'center',
            renderCell: ({ points }) => (
              <div>
                <div className="flex w-full flex-row justify-center text-sm">{points}</div>
              </div>
            ),
          },
          referral: {
            header: 'Referral Points',
            headerAlign: 'center',
            renderCell: ({ referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-center text-sm">{referralPoints || 0}</div>
              </div>
            ),
          },
          totalPoints: {
            header: 'Total points',
            headerAlign: 'right',
            renderCell: ({ points, referralPoints }) => (
              <div>
                <div className="flex w-full flex-row justify-end pr-3">
                  <Typography className="font-bold text-sm" gradient>
                    {points + Number(referralPoints || 0)}
                  </Typography>
                </div>
              </div>
            ),
          },
        }}
        data={seasonLeaderboard || []}
      />
    </Panel.Wrapper>
  )
}
