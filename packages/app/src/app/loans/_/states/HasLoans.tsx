import { type FetchNextPageOptions, type InfiniteData, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { LoanCard } from '@/app/loans/_/LoanCard'
import { CardsContainer } from '@/astaria/components/CardsContainer'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { type GETLoansResponse, type Loan } from '@/astaria/types-internal/loan-schemas'

const NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW = 1

const loadingArray = [...Array(NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW).keys()]

export const HasLoans = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loans,
  refetchLoans,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GETLoansResponse | undefined>>>
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  loans: Loan[]
  refetchLoans?: () => void
}) => {
  const { inView, ref: endOfPage } = useInView()

  useEffect(() => {
    if (loans && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage, loans])

  return (
    <CardsContainer>
      {loans.map((loan) => (
        <div key={loan.id}>
          <LoanCard loan={loan} refetchLoans={refetchLoans} />
        </div>
      ))}
      {isFetchingNextPage
        ? loadingArray.map((id) => (
            <div key={id}>
              <LoanCard skeleton />
            </div>
          ))
        : null}
      <FetchNextPagePoint ref={endOfPage} />
    </CardsContainer>
  )
}
