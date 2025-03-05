import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Address } from 'viem'

export type SeasonLeaderboard = {
  ranking?: number
  userId: string
  points: number
  referralPoints?: number
  walletAddress: Address
}

const dummySeasonLeaderboard: SeasonLeaderboard[] = [
  {
    ranking: 1,
    userId: '123e4567-e89b-12d3-a456-426614174000',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    points: 100,
  },
  {
    ranking: 2,
    userId: '987fcdeb-51a2-43d7-9b56-254415f67890',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef1234',
    points: 90,
  },
]

export function useSeasonLeaderboard(seasonId?: string): UseQueryResult<SeasonLeaderboard[], Error> {
  const data = useQuery({
    queryKey: ['seasonLeaderboard', seasonId],
    queryFn: async (_seasonId) => {
      /*
            const response = await fetch(`/seasons/${seasonId}/leaderboard`)
            const result = response.json()

            const resultWithPlace = result.map((data, index) => {...data, ranking: index + 1})
            */

      return dummySeasonLeaderboard
    },
    enabled: Boolean(seasonId),
    refetchOnMount: false,
  })

  return data
}
