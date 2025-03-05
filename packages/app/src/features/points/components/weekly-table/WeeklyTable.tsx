import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { ResponsiveDataTable } from '@/ui/organisms/responsive-data-table/ResponsiveDataTable'
import { ReferralPointsTooltip } from './ReferralPointsTooltip'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from '@/domain/hooks/useAccount'
import { Loader2 } from 'lucide-react'

export type PointHistory = {
  id: string
  user_id: string
  transaction_id?: string
  points: number
  balance: number
  description: string
  created_at: string
  season_id?: string
  metadata?: Record<string, unknown>
}

export type WeeklyPoints = {
  startDate: Date
  endDate: Date
  points: number
  referralPoints?: number
}

const dummyPointsHistory: PointHistory[] = [
  {
    id: 'txn-1',
    user_id: '0x00',
    transaction_id: 'parent-txn-1',
    points: 250,
    balance: 7500,
    description: 'Points earned',
    created_at: '2025-03-02T10:30:00.000Z',
    season_id: '1',
    metadata: {
      source: 'daily_checkin',
      activity_type: 'checkin',
      timestamp: '2025-03-02T10:30:00.000Z',
    },
  },
  {
    id: 'txn-2',
    user_id: '0x00',
    transaction_id: 'parent-txn-1',
    points: 250,
    balance: 7500,
    description: 'Points earned',
    created_at: '2025-02-20T10:30:00.000Z',
    season_id: '1',
    metadata: {
      source: 'daily_checkin',
      activity_type: 'checkin',
      timestamp: '2025-02-20T10:30:00.000Z',
    },
  },
  {
    id: 'txn-3',
    user_id: '0x00',
    transaction_id: 'parent-txn-1',
    points: 250,
    balance: 7500,
    description: 'Points earned',
    created_at: '2025-02-15T10:30:00.000Z',
    season_id: '1',
    metadata: {
      source: 'daily_checkin',
      activity_type: 'checkin',
      timestamp: '2025-02-15T10:30:00.000Z',
    },
  },
  {
    id: 'txn-4',
    user_id: '0x00',
    transaction_id: 'parent-txn-1',
    points: 250,
    balance: 7500,
    description: 'Points earned',
    created_at: '2025-03-01T10:30:00.000Z',
    season_id: '2',
    metadata: {
      source: 'daily_checkin',
      activity_type: 'checkin',
      timestamp: '2025-03-01T10:30:00.000Z',
    },
  },
]

const formatWeeklyPoint = (week: WeeklyPoints): string => {
  const startStr = week.startDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const endStr = week.endDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return `${startStr} - ${endStr}`
}

export function calculatePointsByWeek(pointsHistory: PointHistory[]): WeeklyPoints[] {
  const sortedPointsHistory = [...pointsHistory].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  if (sortedPointsHistory.length === 0) return []

  const firstDate = new Date('2025-02-10')
  const lastDate = new Date()

  const weeks: WeeklyPoints[] = []
  const currentStart = new Date(firstDate)

  while (currentStart.getDay() !== 2) {
    currentStart.setDate(currentStart.getDate() - 1)
  }

  while (currentStart <= lastDate) {
    const weekEnd = new Date(currentStart)
    weekEnd.setDate(weekEnd.getDate() + 7)

    const weekPoints = sortedPointsHistory
      .filter((item) => new Date(item.created_at) >= currentStart && new Date(item.created_at) < weekEnd)
      .reduce((sum, item) => sum + item.points, 0)

    weeks.push({
      startDate: new Date(currentStart),
      endDate: new Date(weekEnd),
      points: weekPoints,
    })

    currentStart.setDate(currentStart.getDate() + 7)
  }

  return weeks
}

export function WeeklyTable() {
  const account = useAccount()

  const {
    data: weeklyPoints,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['pointsHistory', account],
    queryFn: async (_account) => {
      /*
      const response = await fetch(`/users/${account}/points/history`)
      const result = response.json()
      */

      // TODO: temporary, remove when api is ready
      const result = dummyPointsHistory as unknown as PointHistory[]

      return calculatePointsByWeek(result)
    },
    enabled: Boolean(account),
    refetchOnMount: false,
  })

  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 px-9 py-11">
      <Typography variant="h3" gradient>
        Weekly
      </Typography>

      {isLoading && isFetching ? (
        <Loader2 className="m-auto h-40 w-40 animate-spin" />
      ) : weeklyPoints?.length ? (
        <ResponsiveDataTable
          gridTemplateColumnsClassName="grid-cols-[repeat(3,_1fr)]"
          columnDefinition={{
            week: {
              header: 'Week',
              headerAlign: 'left',
              renderCell: (weeklyPoint) => (
                <div>
                  <div className="flex w-full flex-row justify-start pl-3 text-sm">
                    {formatWeeklyPoint(weeklyPoint)}
                  </div>
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
              header: <ReferralPointsTooltip>Referral Points</ReferralPointsTooltip>,
              headerAlign: 'right',
              renderCell: ({ referralPoints }) => (
                <div>
                  <div className="flex w-full flex-row justify-end pr-3">{referralPoints || 0}</div>
                </div>
              ),
            },
          }}
          data={weeklyPoints}
        />
      ) : (
        <p>Empty table</p>
      )}
    </Panel.Wrapper>
  )
}
