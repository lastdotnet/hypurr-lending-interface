import { DailyPoints } from '@/app/intents/_/IntentFeed/DailyPoints'
import { intentFeedColumns } from '@/app/intents/_/IntentFeed/intentFeedColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'

export const Pending = () => (
  <Card>
    <DailyPoints />
    <DataTable columns={intentFeedColumns} data={[]} isPending />
  </Card>
)
