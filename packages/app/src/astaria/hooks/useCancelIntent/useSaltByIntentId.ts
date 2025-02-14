import { useQuery } from '@tanstack/react-query'

import { useIsClient } from 'usehooks-ts'

import { getSaltByIntentId } from '@/astaria/hooks/useCancelIntent/getSaltByIntentId'
import { useChainId } from '@/astaria/hooks/useChainId'

export const useSaltByIntentId = ({
  enabled,
  id,
}: {
  enabled: boolean
  id?: string
}) => {
  const chainId = useChainId()

  const { data: salt, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && enabled && Boolean(id),
    queryFn: () =>
      getSaltByIntentId({
        chainId,
        id,
      }),
    queryKey: ['salt-by-intent-id', { chainId, id }],
  })

  return { ...rest, salt }
}
