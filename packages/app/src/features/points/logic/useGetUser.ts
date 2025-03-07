import { API_REFERRAL } from '@/config/consts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type User = {
  recent_transactions: Record<string, string>[]
  referral_count: number
  total_points: number
}

export function useGetUser(account?: string): UseQueryResult<User, Error> {
  const data = useQuery({
    queryKey: ['getUser', account],
    queryFn: async () => {
      const response = await fetch(`${API_REFERRAL}/users/${account}`)
      const result = (await response.json()) as unknown as User

      return result
    },
    enabled: Boolean(account),
    refetchOnMount: false,
  })

  return data
}
