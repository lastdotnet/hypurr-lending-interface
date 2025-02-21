import { type QueryClient } from '@tanstack/react-query'

import { type ChainId } from 'chains'

import {
  BORROW_INTENTS_QUERY_KEY,
  BORROW_INTENT_QUERY_KEY,
  INTENTS_QUERY_KEY,
  type IntentLocation,
} from '@/app/isolated/intents/_/constants'
import {
  type BorrowIntent,
  type BorrowIntentWithRecall,
  type GETIntentsResponse,
} from '@/astaria/types-internal/intent-schemas'

const getQueryKey = ({
  chainId,
  intentLocation,
  shortId,
}: {
  chainId: ChainId
  intentLocation: IntentLocation
  shortId: string
}) => {
  if (intentLocation === 'intent-feed') {
    return [INTENTS_QUERY_KEY, { chainId }]
  }
  if (intentLocation === 'intent') {
    return [BORROW_INTENT_QUERY_KEY, { chainId, shortId }]
  }
  return [BORROW_INTENTS_QUERY_KEY, { chainId }]
}

export const removeBorrowIntentFromQuery = ({
  borrowIntent,
  intentLocation,
  queryClient,
}: {
  borrowIntent: BorrowIntent | BorrowIntentWithRecall
  intentLocation: IntentLocation
  queryClient: QueryClient
}) => {
  const queryKey = getQueryKey({
    chainId: borrowIntent.chainId,
    intentLocation,
    shortId: borrowIntent.shortId,
  })

  queryClient.cancelQueries({
    queryKey,
  })
  if (intentLocation === 'intent-feed') {
    queryClient.setQueryData(queryKey, (oldData: { pages?: GETIntentsResponse[] }) => {
      if (oldData?.pages) {
        return {
          ...oldData,
          pages: oldData.pages?.map((page) => ({
            ...page,
            borrowIntents: page.intents.filter(({ shortId }) => shortId !== borrowIntent.shortId),
          })),
        }
      }
      return oldData
    })
  }
  if (intentLocation === 'intent') {
    queryClient.setQueryData(queryKey, null)
  }
  queryClient.invalidateQueries({
    queryKey,
  })
  queryClient.cancelQueries({
    queryKey,
  })
}
