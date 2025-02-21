import { pointsHistoryColumns } from '@/app/isolated/points/history/_/pointsHistoryColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'

export const Pending = () => (
  <Card>
    <DataTable columns={pointsHistoryColumns} data={[]} isPending />
  </Card>
)
