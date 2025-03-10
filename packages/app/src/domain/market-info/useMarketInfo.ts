import { useSuspenseQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'

import { SuspenseQueryWith } from '@/utils/types'

import { useMemo } from 'react'
import { aaveDataLayer } from './aave-data-layer/query'
import { MarketInfo, marketInfoSelectFn } from './marketInfo'
import { useAccount } from '@/domain/hooks/useAccount'
import { QUERY_STALE_TIME } from '@/config/consts'
export interface UseMarketInfoParams {
  chainId: number
  timeAdvance?: number
  refetchInterval?: number
}
export type UseMarketInfoResultOnSuccess = SuspenseQueryWith<{
  marketInfo: MarketInfo
}>

export function useMarketInfo({
  chainId,
  timeAdvance,
  refetchInterval,
}: UseMarketInfoParams): UseMarketInfoResultOnSuccess {
  const account = useAccount()
  const wagmiConfig = useConfig()

  const res = useSuspenseQuery({
    ...aaveDataLayer({
      wagmiConfig,
      chainId,
      account,
      refetchEnabled: !!refetchInterval,
    }),
    select: useMemo(() => marketInfoSelectFn({ timeAdvance }), [timeAdvance]),
    refetchInterval,
    staleTime: QUERY_STALE_TIME,
  })

  return {
    ...res,
    marketInfo: res.data,
  }
}
