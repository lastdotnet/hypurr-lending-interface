import { NativeAssetInfo } from '@/config/chain/types'
import { paths } from '@/config/paths'
import { TokenWithValue } from '@/domain/common/types'
import { MarketInfo } from '@/domain/market-info/marketInfo'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { MarketWalletInfo, WalletBalance } from '@/domain/wallet/useMarketWalletInfo'
import { AssetsTableRow } from '../components/wallet-composition/AssetTable'

interface MakeAssetListParams {
  marketInfo: MarketInfo
  walletInfo: MarketWalletInfo
  includeDeposits: boolean
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}
function makeAssetList({
  marketInfo,
  walletInfo,
  includeDeposits,
  nativeAssetInfo,
  chainId,
}: MakeAssetListParams): AssetsTableRow[] {
  return walletInfo.walletBalances
    .map((walletBalance) => calculateCombinedBalance({ walletBalance, marketInfo, includeDeposits, nativeAssetInfo }))
    .filter(({ value }) => value.gt(0))
    .sort((a, b) => b.token.toUSD(b.value).comparedTo(a.token.toUSD(a.value)))
    .map((asset) => ({
      token: asset.token,
      value: asset.value,
      detailsLink: getDetailsLink({
        token: asset.token,
        chainId,
      }),
    }))
}

interface GetDetailsLinkParams {
  token: Token
  chainId: number
}
function getDetailsLink({ token, chainId }: GetDetailsLinkParams): string {
  return paths.marketDetails.replace(':chainId', chainId.toString()).replace(':asset', token.address)
}

interface CalculateCombinedBalanceParams {
  walletBalance: WalletBalance
  marketInfo: MarketInfo
  includeDeposits: boolean
  nativeAssetInfo: NativeAssetInfo
}
function calculateCombinedBalance({
  walletBalance,
  marketInfo,
  includeDeposits,
  nativeAssetInfo,
}: CalculateCombinedBalanceParams): TokenWithValue {
  if (!includeDeposits || walletBalance.token.symbol === nativeAssetInfo.nativeAssetSymbol) {
    return {
      token: walletBalance.token,
      value: walletBalance.balance,
    }
  }

  const deposit = marketInfo.findPositionByToken(walletBalance.token)?.collateralBalance ?? NormalizedUnitNumber(0)
  return {
    token: walletBalance.token,
    value: NormalizedUnitNumber(walletBalance.balance.plus(deposit)),
  }
}

export interface MakeWalletCompositionParams {
  marketInfo: MarketInfo
  walletInfo: MarketWalletInfo
  compositionWithDeposits: boolean
  setCompositionWithDeposits: (includeDeposits: boolean) => void
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}

export interface WalletCompositionInfo {
  assets: AssetsTableRow[]
  chainId: number
  includeDeposits: boolean
  setIncludeDeposits: (includeDeposits: boolean) => void
  hasCollaterals: boolean
}

export function makeWalletComposition({
  marketInfo,
  walletInfo,
  compositionWithDeposits,
  setCompositionWithDeposits,
  nativeAssetInfo,
  chainId,
}: MakeWalletCompositionParams): WalletCompositionInfo {
  return {
    hasCollaterals: marketInfo.userPositionSummary.totalCollateralUSD.gt(0),
    assets: makeAssetList({
      marketInfo,
      walletInfo,
      includeDeposits: compositionWithDeposits,
      nativeAssetInfo,
      chainId,
    }),
    chainId: marketInfo.chainId,
    includeDeposits: compositionWithDeposits,
    setIncludeDeposits: setCompositionWithDeposits,
  }
}
