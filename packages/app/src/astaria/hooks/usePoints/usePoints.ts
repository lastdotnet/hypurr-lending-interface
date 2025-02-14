import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import { useIsClient } from 'usehooks-ts'

import { getPoints } from '@/astaria/hooks/usePoints/getPoints'

export const usePoints = ({ address }: { address: Address | undefined }) => {
  const { data, ...rest } = useQuery({
    // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
    enabled: useIsClient() && Boolean(address),
    queryFn: () => getPoints({ address: address as Address }),
    queryKey: ['points', { address }],
  })

  return {
    data,
    ...rest,
  }
}
