import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

type UserPoints = {
  breakdown: Record<string, any>
  non_referral_points: number
  recent_transactions: []
  referral_count: number
  referral_points: number
  total_points: number
}

type UserRanking = {
  current_rank: number
  total_participants: number
  weekly_points: number
}

export type UserDetails = {
  points?: UserPoints
  ranking?: UserRanking
  status: 'Active' | 'Inactive' | 'Suspended'
  user_id: string
  wallet_address: string
}

export function useGetUserDetails(account?: string): UseQueryResult<UserDetails, Error> {
  const data = useQuery({
    queryKey: ['getUserDetails', account],
    queryFn: async () => {
      const response = await fetch(`${API_REFERRAL}/users/${account}`)
      const result = (await response.json()) as unknown as UserDetails

      return result
    },
    enabled: Boolean(account),
    refetchOnMount: false,
  })

  return data
}
