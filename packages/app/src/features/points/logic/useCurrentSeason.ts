import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type Season = {
  id: string
  name: string
  start_date: string
  end_date: string
  snapshot_window_start: string
  snapshot_window_end: string
  status: 'upcoming' | 'active' | 'completed'
  total_points_estimate: number
  created_at: string
  updated_at: string
}

const _dummySeason: Season = {
  id: 'season-1',
  name: 'Season 1',
  start_date: '2025-02-20',
  end_date: '2025-05-20',
  snapshot_window_start: '2025-02-20',
  snapshot_window_end: '2025-05-20',
  status: 'active',
  total_points_estimate: 1000000,
  created_at: '2025-02-19',
  updated_at: '2025-02-19',
}

export function useCurrentSeason(): UseQueryResult<Season, Error> {
  const data = useQuery({
    queryKey: ['currentSeason'],
    queryFn: async (_account) => {
      const response = await fetch(`${API_REFERRAL}/seasons/current`)

      return response.json()
    },
    refetchOnMount: false,
  })

  return data
}
