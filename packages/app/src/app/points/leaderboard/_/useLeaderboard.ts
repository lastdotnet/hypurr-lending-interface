import { useInfiniteQuery } from '@tanstack/react-query'

import { PER_PAGE, POINTS_LEADERBOARD_QUERY_KEY } from '@/app/points/leaderboard/_/fetching-constants'
import { getLeaderboard } from '@/app/points/leaderboard/_/getLeaderboard'
import { type GETLeaderboardResponse } from '@/astaria/types-internal/points-schemas'

export const useLeaderboard = () => {
  const { data, ...rest } = useInfiniteQuery({
    getNextPageParam: (lastPage: GETLeaderboardResponse) => {
      if (!lastPage || lastPage.paging.onLastPage) {
        return undefined
      }
      return lastPage.paging.offset + PER_PAGE
    },
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => getLeaderboard({ limit: PER_PAGE, offset: pageParam }),
    queryKey: [POINTS_LEADERBOARD_QUERY_KEY],
  })

  const leaderboard = data?.pages.flatMap((page) => page.leaderboard) ?? []

  return {
    leaderboard,
    ...rest,
  }
}
