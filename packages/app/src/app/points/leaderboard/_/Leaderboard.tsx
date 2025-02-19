'use client'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/points/leaderboard/_/states/Error'
import { HasPointsLeaderboard } from '@/app/points/leaderboard/_/states/HasPointsLeaderboard'
import { Pending } from '@/app/points/leaderboard/_/states/Pending'
import { useLeaderboard } from '@/app/points/leaderboard/_/useLeaderboard'

export const Leaderboard = () => {
  const { fetchNextPage, hasNextPage, isError, isFetchingNextPage, isPending, isSuccess, leaderboard } =
    useLeaderboard()

  return (
    <>
      <p className="text-center text-xs">Leaderboard updates every 5 minutes</p>

      {(() => {
        if (isSuccess && leaderboard && leaderboard.length > 0) {
          return (
            <HasPointsLeaderboard
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              leaderboard={leaderboard}
            />
          )
        }

        if (isError || (isSuccess && (!leaderboard || (leaderboard && leaderboard.length < 1)))) {
          return <Error />
        }

        if (isPending) {
          return <Pending />
        }

        return null
      })()}
    </>
  )
}
