import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Leaderboard } from './useSeasonLeaderboard'

export type WeeklyLeaderboard = {
  entries?: Leaderboard[]
  total_entries: number
}

export function useWeeklyLeaderboard(): UseQueryResult<WeeklyLeaderboard, Error> {
  const data = useQuery({
    queryKey: ['weeklyLeaderboard'],
    queryFn: async () => {
      const response = await fetch(`${API_REFERRAL}/weekly-leaderboard`)
      const result = (await response.json()) as unknown as WeeklyLeaderboard

      return result
    },
    refetchOnMount: false,
  })

  return data
}
