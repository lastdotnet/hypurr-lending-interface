import { useInfiniteQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import { useIsClient } from 'usehooks-ts'

import { getPointsHistory } from '@/app/isolated/points/history/_/getPointsHistory'
import { type GETPointsHistoryResponse } from '@/astaria/types-internal/points-schemas'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

const PER_PAGE = 10

export const usePointsHistory = () => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const { data, ...rest } = useInfiniteQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && Boolean(address),
    getNextPageParam: (lastPage: GETPointsHistoryResponse) => {
      if (!lastPage || lastPage.paging.onLastPage) {
        return undefined
      }
      return lastPage.paging.offset + PER_PAGE
    },
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getPointsHistory({
        address: address as Address,
        limit: PER_PAGE,
        offset: pageParam,
      }),
    queryKey: ['points-history', { address }],
  })

  const pointsEvents = data?.pages.flatMap((page) => page.pointsEvents) ?? []

  return {
    pointsEvents,
    ...rest,
  }
}
