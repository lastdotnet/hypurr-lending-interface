import { useSuspenseQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'

import { SuspenseQueryWith } from '@/utils/types'

import { useMemo } from 'react'
import { AaveData, aaveDataLayer, aaveDataLayerSelectFn } from './query'
import { useAccount } from '@/domain/hooks/useAccount'
import { QUERY_REFETCH_INTERVAL } from '@/config/consts'
export interface UseAaveDataLayerParams {
  chainId: number
}
export type UseAaveDataLayerResultOnSuccess = SuspenseQueryWith<{
  aaveData: AaveData
}>

export function useAaveDataLayer({ chainId }: UseAaveDataLayerParams): UseAaveDataLayerResultOnSuccess {
  const account = useAccount()
  const wagmiConfig = useConfig()

  const result = useSuspenseQuery({
    ...aaveDataLayer({
      wagmiConfig,
      chainId,
      account,
    }),
    select: useMemo(() => aaveDataLayerSelectFn(), []),
    refetchInterval: QUERY_REFETCH_INTERVAL,
  })

  return {
    ...result,
    aaveData: result.data,
  }
}
