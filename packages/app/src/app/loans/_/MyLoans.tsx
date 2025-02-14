'use client'

import { useAccount } from 'wagmi'

import { HasLoans } from '@/app/loans/_/states/HasLoans'
import { NoLoans } from '@/app/loans/_/states/NoLoans'
import { Pending } from '@/app/loans/_/states/Pending'
import { useLoans } from '@/app/loans/_/useLoans/useLoans'

export const MyLoans = () => {
  const { address } = useAccount()
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    isSuccess,
    loans,
    refetch: refetchLoans,
  } = useLoans({ address })

  if (isSuccess && loans && loans.length > 0) {
    return (
      <HasLoans
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loans={loans}
        refetchLoans={refetchLoans}
      />
    )
  }

  if (isError || (isSuccess && (!loans || (loans && loans.length < 1)))) {
    return <NoLoans />
  }

  if (isPending) {
    return <Pending />
  }

  return null
}
