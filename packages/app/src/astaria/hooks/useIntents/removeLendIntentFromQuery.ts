import { type QueryClient } from '@tanstack/react-query'

import { type IntentLocation, LEND_INTENTS_QUERY_KEY } from '@/app/isolated/intents/_/constants'
import { type GETIntentsResponse, type LendIntent } from '@/astaria/types-internal/intent-schemas'

export const removeLendIntentFromQuery = ({
  intentLocation,
  lendIntent,
  queryClient,
}: {
  intentLocation: IntentLocation
  lendIntent: LendIntent
  queryClient: QueryClient
}) => {
  const queryKey = [LEND_INTENTS_QUERY_KEY, { chainId: lendIntent.chainId }]

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
            lendIntents: page.intents.filter(({ shortId }) => shortId !== lendIntent.shortId),
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
