import { pointsLeaderboardColumns } from '@/app/points/leaderboard/_/pointsLeaderboardColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'

export const Pending = () => (
  <Card>
    <DataTable columns={pointsLeaderboardColumns} data={[]} isPending />
  </Card>
)
