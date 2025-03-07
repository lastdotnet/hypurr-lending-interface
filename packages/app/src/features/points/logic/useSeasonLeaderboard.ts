import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Address } from 'viem'

export type Leaderboard = {
  rank: number
  user_id: string
  points: number
  referral_points?: number
  wallet_address: Address
}

const _dummySeasonLeaderboard: Leaderboard[] = [
  {
    rank: 1,
    user_id: '123e4567-e89b-12d3-a456-426614174000',
    wallet_address: '0x1234567890abcdef1234567890abcdef12345678',
    points: 100,
  },
  {
    rank: 2,
    user_id: '987fcdeb-51a2-43d7-9b56-254415f67890',
    wallet_address: '0xabcdef1234567890abcdef1234567890abcdef1234',
    points: 90,
  },
]

export function useSeasonLeaderboard(seasonId?: string): UseQueryResult<Leaderboard[], Error> {
  const data = useQuery({
    queryKey: ['seasonLeaderboard', seasonId],
    queryFn: async () => {
      const response = await fetch(`${API_REFERRAL}/seasons/${seasonId}/leaderboard`)
      const result = (await response.json()) as unknown as Leaderboard[]

      return result
    },
    enabled: Boolean(seasonId),
    refetchOnMount: false,
  })

  return data
}
