import { useSuspenseQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'

import { SuspenseQueryWith } from '@/utils/types'

import { useMemo } from 'react'
import { AaveData, aaveDataLayer, aaveDataLayerSelectFn } from './query'
import { useAccount } from '@/domain/hooks/useAccount'
import { QUERY_STALE_TIME } from '@/config/consts'
export interface UseAaveDataLayerParams {
  chainId: number
  refetchInterval?: number
}
export type UseAaveDataLayerResultOnSuccess = SuspenseQueryWith<{
  aaveData: AaveData
}>

export function useAaveDataLayer({
  chainId,
  refetchInterval,
}: UseAaveDataLayerParams): UseAaveDataLayerResultOnSuccess {
  const account = useAccount()
  const wagmiConfig = useConfig()

  const result = useSuspenseQuery({
    ...aaveDataLayer({
      wagmiConfig,
      chainId,
      account,
      refetchEnabled: !!refetchInterval,
    }),
    select: useMemo(() => aaveDataLayerSelectFn(), []),
    refetchInterval,
    staleTime: QUERY_STALE_TIME,
  })

  return {
    ...result,
    aaveData: result.data,
  }
}
