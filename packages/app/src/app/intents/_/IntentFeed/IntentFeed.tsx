'use client'

import { HasIntents } from '@/app/intents/_/IntentFeed/states/HasIntents'
import { NoIntents } from '@/app/intents/_/IntentFeed/states/NoIntents'
import { Pending } from '@/app/intents/_/IntentFeed/states/Pending'
import { useIntents } from '@/astaria/hooks/useIntents/useIntents'

export const IntentFeed = () => {
  const { fetchNextPage, hasNextPage, intents, isError, isFetchingNextPage, isPending, isRefetching, isSuccess } =
    useIntents()

  if (isSuccess && intents && intents.length > 0) {
    return (
      <HasIntents
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        intents={intents}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
      />
    )
  }

  if (isError || (isSuccess && (!intents || (intents && intents.length < 1)))) {
    return <NoIntents />
  }

  if (isPending) {
    return <Pending />
  }

  return null
}
