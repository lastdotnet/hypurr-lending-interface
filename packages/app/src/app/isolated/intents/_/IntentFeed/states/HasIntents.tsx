import { type FetchNextPageOptions, type InfiniteData, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ONE_SECOND } from 'common'
import { useInterval, useLocalStorage } from 'usehooks-ts'

import { IntentCard } from '@/app/isolated/intents/_/IntentCard'
import { DailyPoints } from '@/app/isolated/intents/_/IntentFeed/DailyPoints'
import { intentFeedColumns } from '@/app/isolated/intents/_/IntentFeed/intentFeedColumns'
import { Card } from '@/astaria/components/Card'
import { CardsContainer } from '@/astaria/components/CardsContainer'
import { DataTable } from '@/astaria/components/DataTable'
import { ExpertModeWarning } from '@/astaria/components/ExpertModeWarning'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { type BorrowIntent, type GETIntentsResponse, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { calculateRecallLtvs } from '@/astaria/utils/calculateRecallLtvs'

const NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW = 2

const loadingArray = [...Array(NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW).keys()]

export const HasIntents = ({
  fetchNextPage,
  hasNextPage,
  intents,
  isFetchingNextPage,
  isRefetching,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GETIntentsResponse | undefined>>>
  hasNextPage: boolean | undefined
  intents: (BorrowIntent | LendIntent)[]
  isFetchingNextPage: boolean
  isRefetching: boolean
}) => {
  const [currentIntents, setCurrentIntents] = useState(calculateRecallLtvs(intents))

  useInterval(() => {
    setCurrentIntents(calculateRecallLtvs(intents))
  }, ONE_SECOND)

  const { inView, ref: endOfPage } = useInView()
  const [isExpertMode] = useLocalStorage('isExpertMode', false, {
    initializeWithValue: false,
  })

  useEffect(() => {
    if (currentIntents && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, currentIntents, inView, isFetchingNextPage])

  return (
    <section className="space-y-4">
      <Card>
        <DailyPoints />
        <DataTable
          className="hidden w-full lg:block"
          columns={intentFeedColumns}
          data={currentIntents}
          defaultSorting={[{ desc: false, id: 'deadline' }]}
          infoMessage={isExpertMode ? <ExpertModeWarning /> : null}
          isFetchingNextPage={isFetchingNextPage}
          isRefetching={isRefetching}
        />
      </Card>
      <CardsContainer className="lg:hidden">
        {currentIntents?.map((intent) => (
          <div key={intent.id}>
            <IntentCard intent={intent} intentLocation="intent-feed" />
          </div>
        ))}
        {isFetchingNextPage || isRefetching
          ? loadingArray.map((id) => (
              <div key={id}>
                <IntentCard intentLocation="intent-feed" skeleton />
              </div>
            ))
          : null}
      </CardsContainer>
      <FetchNextPagePoint ref={endOfPage} />
    </section>
  )
}
