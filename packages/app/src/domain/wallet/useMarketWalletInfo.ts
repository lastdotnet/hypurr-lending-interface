import { useSuspenseQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'

import { useMarketInfo } from '../market-info/useMarketInfo'
import { NormalizedUnitNumber } from '../types/NumericValues'
import { Token } from '../types/Token'
import { TokenSymbol } from '../types/TokenSymbol'
import { marketBalances } from './marketBalances'
import { useAccount } from '@/domain/hooks/useAccount'
import { QUERY_REFETCH_INTERVAL } from '@/config/consts'

export interface WalletBalance {
  balance: NormalizedUnitNumber
  token: Token
}

export interface MarketWalletInfoParams {
  chainId: number
}

export interface MarketWalletInfo {
  isConnected: boolean
  walletBalances: WalletBalance[]

  findWalletBalanceForToken: (token: Token) => NormalizedUnitNumber
  findWalletBalanceForSymbol: (symbol: TokenSymbol) => NormalizedUnitNumber
}

export function useMarketWalletInfo({ chainId }: MarketWalletInfoParams): MarketWalletInfo {
  const account = useAccount()
  const wagmiConfig = useConfig()
  const { marketInfo } = useMarketInfo({ chainId, refetchInterval: QUERY_REFETCH_INTERVAL })

  const { data: balanceData } = useSuspenseQuery({
    ...marketBalances({
      wagmiConfig,
      account,
      chainId,
    }),
  })

  const walletBalances: WalletBalance[] = balanceData
    .map((balanceItem) => {
      const token = marketInfo.findReserveByUnderlyingAsset(balanceItem.address)?.token
      if (!token) {
        return {
          balance: undefined,
          token: undefined,
        }
      }

      return {
        balance: token.fromBaseUnit(balanceItem.balanceBaseUnit),
        token,
      }
    })
    .filter((r) => r.token)
    // @note: this map is here only to make TS happy :(
    .map((r) => ({
      balance: r.balance!,
      token: r.token!,
    }))

  /* eslint-disable func-style */
  const findWalletBalanceForToken = (token: Token): NormalizedUnitNumber => {
    return findWalletBalanceForSymbol(token.symbol)
  }
  const findWalletBalanceForSymbol = (symbol: TokenSymbol): NormalizedUnitNumber => {
    const aTokenReserve = marketInfo.findReserveByATokenSymbol(symbol)
    if (aTokenReserve) {
      return aTokenReserve.aTokenBalance
    }

    return walletBalances.find((wb) => wb.token.symbol === symbol)?.balance ?? NormalizedUnitNumber(0)
  }
  /* eslint-enable func-style */

  return {
    walletBalances,
    isConnected: !!account,
    findWalletBalanceForToken,
    findWalletBalanceForSymbol,
  }
}
