import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

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

const _dummyPointsHistory: PointHistory[] = [
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

export function calculatePointsByWeek(pointsHistory: PointHistory[]): WeeklyPoints[] {
  const sortedPointsHistory = [...pointsHistory].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  const firstDate = new Date('2025-02-20')
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

export function useWeeklyPoints(userId?: string): UseQueryResult<WeeklyPoints[], Error> {
  const data = useQuery({
    queryKey: ['pointsHistory', userId],
    queryFn: async () => {
      try {
        if (!userId) {
          return calculatePointsByWeek([])
        }

        const response = await fetch(`${API_REFERRAL}/users/${userId}/points/history`)

        const result = (await response.json()) as unknown as PointHistory[]

        return calculatePointsByWeek(result)
      } catch (_e) {
        return calculatePointsByWeek([])
      }
    },
  })

  return data
}
