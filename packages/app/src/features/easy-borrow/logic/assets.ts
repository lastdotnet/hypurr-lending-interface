import { NativeAssetInfo } from '@/config/chain/types'
import { TokenWithBalance } from '@/domain/common/types'
import { MarketInfo, Reserve, UserPosition } from '@/domain/market-info/marketInfo'
import { MarketWalletInfo } from '@/domain/wallet/useMarketWalletInfo'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { UpgradeOptions } from './useUpgradeOptions'
import { Token } from '@/domain/types/Token'

const blacklistedDepositableAssets = ['USDXL']
export function getDepositableAssets(positions: UserPosition[], walletInfo: MarketWalletInfo): TokenWithBalance[] {
  return (
    positions
      .filter((p) => p.reserve.status === 'active' && !p.reserve.isIsolated)
      // Filter out reserves that cannot be used as collateral
      .filter((p) => p.reserve.usageAsCollateralEnabled)
      // Filter out positions that have deposit, but usage as collateral is turned off by user
      .filter((p) => p.collateralBalance.eq(0) || p.reserve.usageAsCollateralEnabledOnUser)
      .filter((p) => !blacklistedDepositableAssets.includes(p.reserve.token.symbol))
      .map((p) => ({ token: p.reserve.token, balance: walletInfo.findWalletBalanceForToken(p.reserve.token) }))
  )
}
const usdxlEnabled = process.env.NEXT_PUBLIC_FEATURE_USDXL === '1'

const defaultWhitelistedBorrowableAssets = ['USDC', 'sUSDe', 'WHYPE', 'SolvBTC', 'stTESTH']
const whitelistedBorrowableAssets = usdxlEnabled
  ? [...defaultWhitelistedBorrowableAssets, 'USDXL']
  : defaultWhitelistedBorrowableAssets

function isTokenSymbol(token: Token, symbol: string) {
  return token.symbol === TokenSymbol(symbol)
}

export function getBorrowableAssets(
  reserves: Reserve[],
  walletInfo: MarketWalletInfo,
  _upgradeOptions?: UpgradeOptions,
): TokenWithBalance[] {
  const marketTokens = reserves
    .filter((r) => whitelistedBorrowableAssets.includes(r.token.symbol))
    .map((r) => ({ token: r.token, balance: walletInfo.findWalletBalanceForToken(r.token) }))

  const usdxl = marketTokens.find(({ token }) => isTokenSymbol(token, 'USDXL'))
  const wHype = marketTokens.find(({ token }) => isTokenSymbol(token, 'WHYPE'))

  const otherTokens = marketTokens.filter(
    ({ token }) => !isTokenSymbol(token, 'USDXL') && !isTokenSymbol(token, 'WHYPE'),
  )

  return [...(usdxl ? [usdxl] : []), ...(wHype ? [wHype] : []), ...otherTokens]
}

export function sortByDecreasingBalances(tokens: TokenWithBalance[]): TokenWithBalance[] {
  return tokens.sort((a, b) => b.balance.minus(a.balance).toNumber())
}

export function imputeNativeAsset(marketInfo: MarketInfo, nativeAssetInfo: NativeAssetInfo): UserPosition[] {
  const positionsWithoutWrappedNativeAsset = marketInfo.userPositions.filter(
    (p) => p.reserve.token.symbol !== nativeAssetInfo.wrappedNativeAssetSymbol,
  )

  return [...positionsWithoutWrappedNativeAsset, marketInfo.findOnePositionBySymbol(nativeAssetInfo.nativeAssetSymbol)]
}
