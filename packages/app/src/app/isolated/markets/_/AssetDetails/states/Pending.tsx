import { assetDetailsColumns } from '@/app/isolated/markets/_/AssetDetails/assetDetailsColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'

export const Pending = () => (
  <Card>
    <DataTable columns={assetDetailsColumns} data={[]} isPending />
  </Card>
)
