import { savingsXDaiAdapterAbi, savingsXDaiAdapterAddress } from '@/config/contracts-generated'
import { useQueryClient } from '@tanstack/react-query'
import { gnosis } from 'viem/chains'
import { useAccount, useConfig } from 'wagmi'
import { ensureConfigTypes, useWrite } from '../hooks/useWrite'
import { balances } from '../wallet/balances'

export interface UseSexyDaiRedeemAllArgs {
  onTransactionSettled?: () => void
  enabled?: boolean
}

// @note: 'redeemAllXDAI' function allows user to redeem all xDAI in exchange for all sDAI.
export function useSexyDaiRedeemAll({
  onTransactionSettled,
  enabled: _enabled = true,
}: UseSexyDaiRedeemAllArgs): ReturnType<typeof useWrite> {
  const client = useQueryClient()
  const wagmiConfig = useConfig()

  const { address: receiver } = useAccount()

  const config = ensureConfigTypes({
    address: savingsXDaiAdapterAddress[gnosis.id],
    abi: savingsXDaiAdapterAbi,
    functionName: 'redeemAllXDAI',
    args: [receiver!],
  })
  const enabled = _enabled && !!receiver

  return useWrite(
    {
      ...config,
      enabled,
    },
    {
      onTransactionSettled: async () => {
        void client.invalidateQueries({
          queryKey: balances({ wagmiConfig, chainId: gnosis.id, account: receiver }).queryKey,
        })

        onTransactionSettled?.()
      },
    },
  )
}