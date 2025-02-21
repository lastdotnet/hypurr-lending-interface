import { useInfiniteQuery } from '@tanstack/react-query'

import { sepolia } from 'viem/chains'

import { useLocalStorage } from 'usehooks-ts'

import { INTENTS_QUERY_KEY, PER_PAGE } from '@/app/isolated/intents/_/constants'
import { useChainId } from '@/astaria/hooks/useChainId'
import { getIntents } from '@/astaria/hooks/useIntents/getIntents'
import { type GETIntentsResponse } from '@/astaria/types-internal/intent-schemas'

export const useIntents = () => {
  const chainId = useChainId()
  const [isExpertMode] = useLocalStorage('isExpertMode', false, {
    initializeWithValue: false,
  })
  const isTestnet = chainId === sepolia.id
  const { data, ...rest } = useInfiniteQuery({
    getNextPageParam: (lastPage: GETIntentsResponse) => {
      if (!lastPage || lastPage.paging.onLastPage) {
        return undefined
      }
      return lastPage.paging.offset + PER_PAGE
    },
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getIntents({
        intentFilterParameters: {
          isExpertMode,
        },
        isTestnet,
        limit: PER_PAGE,
        offset: pageParam,
      }),
    queryKey: [INTENTS_QUERY_KEY, { isExpertMode, isTestnet }],
  })

  const intents = data?.pages.flatMap((page) => page.intents) ?? []

  return {
    ...rest,
    intents,
  }
}
