import { useQuery } from '@tanstack/react-query'

import { type Address } from 'viem'
import { useAccount } from 'wagmi'

import { useIsClient } from 'usehooks-ts'

import { getCanClaimDailyPointsQueryKey } from '@/app/intents/_/IntentFeed/DailyPoints/getCanClaimDailyPointsQueryKey'
import { getNextClaimTime } from '@/app/intents/_/IntentFeed/DailyPoints/useNextClaimTime/getNextClaimTime'

export const useNextClaimTime = () => {
  const { address } = useAccount()
  // Make query only load on client side, this is a workaround for https://github.com/TanStack/query/issues/6145
  const { data, ...rest } = useQuery({
    enabled: useIsClient() && Boolean(address),
    queryFn: () => getNextClaimTime({ address: address as Address }),
    queryKey: getCanClaimDailyPointsQueryKey({ address }),
  })

  return {
    nextClaimTime: data,
    ...rest,
  }
}
