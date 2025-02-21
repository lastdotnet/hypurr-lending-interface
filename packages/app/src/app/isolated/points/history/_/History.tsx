'use client'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/isolated/points/history/_/states/Error'
import { HasPointsHistory } from '@/app/isolated/points/history/_/states/HasPointsHistory'
import { NoPointsHistory } from '@/app/isolated/points/history/_/states/NoPointsHistory'
import { Pending } from '@/app/isolated/points/history/_/states/Pending'
import { usePointsHistory } from '@/app/isolated/points/history/_/usePointsHistory'
import { Connected } from '@/astaria/components/Connected'
import { EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { NotConnected } from '@/astaria/components/NetworkErrors/NotConnected'

export const History = () => {
  const { fetchNextPage, hasNextPage, isError, isFetchingNextPage, isPending, isSuccess, pointsEvents } =
    usePointsHistory()

  return (
    <section className="space-y-4">
      <Connected
        connectedComponent={(() => {
          if (isSuccess && pointsEvents && pointsEvents.length > 0) {
            return (
              <HasPointsHistory
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                pointsEvents={pointsEvents}
              />
            )
          }

          if (isSuccess && (!pointsEvents || pointsEvents.length === 0)) {
            return <NoPointsHistory />
          }

          if (isError) {
            return <Error />
          }

          if (isPending) {
            return <Pending />
          }

          return null
        })()}
        notConnectedComponent={
          <EmptyStateWrapper>
            <NotConnected />
          </EmptyStateWrapper>
        }
      />
    </section>
  )
}
