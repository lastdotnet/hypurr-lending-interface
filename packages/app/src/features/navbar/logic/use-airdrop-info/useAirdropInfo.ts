import { useQuery } from '@tanstack/react-query'
import { useAccount } from '@/domain/hooks/useAccount'

import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { airdropInfo } from '@/features/navbar/logic/use-airdrop-info/airdropInfo'
import { AirdropInfo } from '../../types'
import { extendAirdropResponse } from './utils/extendAirdropResponse'

interface UseAirdropInfoParams {
  refreshIntervalInMs: number
}

export function useAirdropInfo({ refreshIntervalInMs }: UseAirdropInfoParams): AirdropInfo {
  const address = useAccount()

  const result = useQuery(airdropInfo(address && CheckedAddress(address)))

  const airdrop = extendAirdropResponse({ airdropInfoResponse: result.data, refreshIntervalInMs })
  const isLoading = result.isLoading
  const isError = result.isError

  return {
    airdrop,
    isLoading,
    isError,
  }
}
