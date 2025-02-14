'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { type Address } from 'viem'
import { sepolia } from 'viem/chains'

import { useIsClient } from 'usehooks-ts'

import { PER_PAGE } from '@/app/intents/_/constants'
import { getLoans } from '@/app/loans/_/useLoans/getLoans'
import { useChainId } from '@/astaria/hooks/useChainId'
import { type GETLoansResponse } from '@/astaria/types-internal/loan-schemas'

export const useLoans = ({ address }: { address?: Address | undefined }) => {
  const chainId = useChainId()
  const isTestnet = chainId === sepolia.id

  const { data, ...rest } = useInfiniteQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient(),
    getNextPageParam: (lastPage: GETLoansResponse) => {
      if (!lastPage || lastPage.paging.onLastPage) {
        return undefined
      }
      return lastPage.paging.offset + PER_PAGE
    },
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getLoans({
        address,
        isTestnet,
        limit: PER_PAGE,
        offset: pageParam,
      }),
    queryKey: ['loans', { address, isTestnet }],
  })
  const loans = data?.pages.flatMap((page) => page.loans) ?? []

  return { ...rest, loans }
}
