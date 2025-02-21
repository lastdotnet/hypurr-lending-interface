import { type FetchNextPageOptions, type InfiniteData, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { pointsHistoryColumns } from '@/app/isolated/points/history/_/pointsHistoryColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { type GETPointsHistoryResponse, type PointsEvent } from '@/astaria/types-internal/points-schemas'

export const HasPointsHistory = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  pointsEvents,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GETPointsHistoryResponse | undefined>>>
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  pointsEvents: PointsEvent[]
}) => {
  const { inView, ref: endOfPage } = useInView()

  useEffect(() => {
    if (pointsEvents && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage, pointsEvents])

  return (
    <Card>
      <DataTable columns={pointsHistoryColumns} data={pointsEvents} isFetchingNextPage={isFetchingNextPage} />
      <FetchNextPagePoint ref={endOfPage} />
    </Card>
  )
}
