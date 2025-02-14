import { useQuery } from '@tanstack/react-query'

import { useIsClient } from 'usehooks-ts'

import { BORROW_INTENT_QUERY_KEY } from '@/app/intents/_/constants'
import { getIntent } from '@/astaria/hooks/useIntent/getIntent'
import { type GETIntentParameters } from '@/astaria/types-internal/intent-schemas'

export const useIntent = ({ shortId }: Pick<GETIntentParameters, 'shortId'>) => {
  const { data, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient(),
    queryFn: () =>
      getIntent({
        shortId,
      }),
    queryKey: [BORROW_INTENT_QUERY_KEY, { shortId }],
  })

  return { data, ...rest }
}
