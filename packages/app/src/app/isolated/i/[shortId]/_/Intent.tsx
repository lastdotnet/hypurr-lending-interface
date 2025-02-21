'use client'

import { type Hash } from 'viem'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/isolated/i/[shortId]/_/states/Error'
import { IntentCard } from '@/app/isolated/intents/_/IntentCard'
import { useIntent } from '@/astaria/hooks/useIntent/useIntent'

export const Intent = ({ shortId }: { shortId: Hash }) => {
  const { data, isError, isPending, isSuccess } = useIntent({ shortId })

  if (isSuccess && data) {
    return <IntentCard intent={data.intent} intentLocation="intent" isArchived={data.isArchived} />
  }
  if (isError || (isSuccess && !data)) {
    return <Error shortId={shortId} />
  }

  if (isPending) {
    return <IntentCard intentLocation="intent" skeleton />
  }

  return null
}
