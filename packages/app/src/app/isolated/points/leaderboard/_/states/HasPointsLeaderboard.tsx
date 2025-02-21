'use client'

import { type FetchNextPageOptions, type InfiniteData, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { pointsLeaderboardColumns } from '@/app/isolated/points/leaderboard/_/pointsLeaderboardColumns'
import { Card } from '@/astaria/components/Card'
import { DataTable } from '@/astaria/components/DataTable'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { type GETLeaderboardResponse, type LeaderboardEntry } from '@/astaria/types-internal/points-schemas'

export const HasPointsLeaderboard = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  leaderboard,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GETLeaderboardResponse | undefined>>>
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  leaderboard: LeaderboardEntry[]
}) => {
  const { inView, ref: endOfPage } = useInView()

  useEffect(() => {
    if (leaderboard && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage, leaderboard])

  return (
    <Card>
      <DataTable
        columns={pointsLeaderboardColumns}
        data={leaderboard}
        isFetchingNextPage={isFetchingNextPage}
        size="narrow"
      />
      <FetchNextPagePoint ref={endOfPage} />
    </Card>
  )
}
