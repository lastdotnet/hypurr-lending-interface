import { type ColumnDef } from '@tanstack/react-table'

import { BlockExplorerLink } from '@/astaria/components/BlockExplorerLink'
import { PointsDisplay } from '@/astaria/components/Points'
import { UserInfo } from '@/astaria/components/UserInfo'
import { type LeaderboardEntry } from '@/astaria/types-internal/points-schemas'

export const pointsLeaderboardColumns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: 'rank',
    cell: ({ row }) => {
      const rank = row.getValue<LeaderboardEntry['rank']>('rank')
      return <div className="text-center font-extrabold">{rank}</div>
    },
    header: () => <div className="text-center">Rank</div>,
  },
  {
    accessorKey: 'address',
    cell: ({ row }) => {
      const address = row.getValue<LeaderboardEntry['address']>('address')
      return (
        <div className="flex items-center gap-2">
          <BlockExplorerLink className="whitespace-nowrap" showIcon={false} type="address" value={address}>
            <UserInfo address={address} markConnectedAddress />
          </BlockExplorerLink>
        </div>
      )
    },
    header: () => <div>Address</div>,
  },
  {
    accessorKey: 'points',
    cell: ({ row }) => {
      const points = row.getValue<LeaderboardEntry['points']>('points')
      return (
        <div className="whitespace-nowrap text-right font-extrabold">
          <PointsDisplay points={points} />
        </div>
      )
    },
    header: () => <div className="text-right">Points</div>,
  },
]
