import { NativeAssetInfo } from '@/config/chain/types'
import { reserveBlacklist } from '@/config/consts'
import { paths } from '@/config/paths'
import { assetCanBeBorrowed } from '@/domain/common/assets'
import { MarketInfo, UserPosition } from '@/domain/market-info/marketInfo'
import { ReserveStatus } from '@/domain/market-info/reserve-status'
import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { MarketWalletInfo } from '@/domain/wallet/useMarketWalletInfo'
import { RowClickOptions } from '@/ui/molecules/data-table/DataTable'
import { applyTransformers } from '@/utils/applyTransformers'
import { getBorrowableAmount } from '@/utils/getBorrowableAmount'
import { sortReserves } from '@/utils/sortReserves'

export interface Deposit {
  token: Token
  reserveStatus: ReserveStatus
  balance: NormalizedUnitNumber
  deposit: NormalizedUnitNumber
  supplyAPY: Percentage | undefined
  isUsedAsCollateral: boolean
  usageAsCollateralEnabled: boolean
  isCombinedBalance?: boolean
}

export interface DepositEntryRowData extends Deposit {
  rowClickOptions: RowClickOptions
}

export interface Borrow {
  token: Token
  reserveStatus: ReserveStatus
  available: NormalizedUnitNumber
  debt: NormalizedUnitNumber
  borrowAPY: Percentage | undefined
}

export interface BorrowEntryRowData extends Borrow {
  rowClickOptions: RowClickOptions
}

export interface GetDepositsParams {
  marketInfo: MarketInfo
  walletInfo: MarketWalletInfo
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}
export function getDeposits({ marketInfo, walletInfo, nativeAssetInfo, chainId }: GetDepositsParams): Deposit[] {
  const sortedPositions = sortReserves(marketInfo.userPositions, (p) => p.reserve.token.symbol)
  return sortedPositions
    .filter((position) => !reserveBlacklist.includes(position.reserve.token.symbol))
    .map((position) => {
      const result = applyTransformers({ position, marketInfo, walletInfo, nativeAssetInfo, chainId })([
        // hideDaiWhenLendingDisabled,
        hideFrozenAssetIfNotDeposited,
        transformNativeAssetDeposit,
        transformDefaultDeposit,
      ])

      return result !== null ? result : undefined
    })
    .filter((deposit): deposit is Deposit => deposit !== undefined)
}

interface DepositTransformerParams extends GetDepositsParams {
  position: UserPosition
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}

function transformNativeAssetDeposit({
  position,
  marketInfo,
  walletInfo,
  nativeAssetInfo,
  chainId,
}: DepositTransformerParams): Deposit | undefined {
  if (position.reserve.token.symbol !== nativeAssetInfo.wrappedNativeAssetSymbol) {
    return undefined
  }
  const deposit = transformDefaultDeposit({ position, marketInfo, walletInfo, nativeAssetInfo, chainId })

  return {
    ...deposit,
    token: marketInfo.findTokenBySymbol(nativeAssetInfo.nativeAssetSymbol)!,
    balance: NormalizedUnitNumber(
      walletInfo
        .findWalletBalanceForToken(position.reserve.token)
        .plus(walletInfo.findWalletBalanceForSymbol(nativeAssetInfo.nativeAssetSymbol)),
    ),
    isCombinedBalance: true,
  }
}

function transformDefaultDeposit({ position, walletInfo, chainId }: DepositTransformerParams): DepositEntryRowData {
  return {
    token: position.reserve.token,
    reserveStatus: position.reserve.status,
    balance: walletInfo.findWalletBalanceForToken(position.reserve.token),
    deposit: position.collateralBalance,
    supplyAPY: position.reserve.supplyAPY,
    isUsedAsCollateral: position.reserve.usageAsCollateralEnabledOnUser,
    usageAsCollateralEnabled: position.reserve.usageAsCollateralEnabled,
    rowClickOptions: {
      destination: paths.marketDetails
        .replace(':chainId', chainId.toString())
        .replace(':asset', position.reserve.token.address),
    },
  }
}

function hideFrozenAssetIfNotDeposited({ position }: DepositTransformerParams): null | undefined {
  if (position.reserve.status === 'frozen' && position.collateralBalance.isZero()) {
    return null
  }
}

export interface GetBorrowsParams {
  marketInfo: MarketInfo
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}

export function getBorrows({ marketInfo, nativeAssetInfo, chainId }: GetBorrowsParams): Borrow[] {
  const sortedPositions = sortReserves(marketInfo.userPositions, (p) => p.reserve.token.symbol)
  return sortedPositions
    .filter((position) => assetCanBeBorrowed(position.reserve) || position.borrowBalance.gt(0))
    .filter((position) => !reserveBlacklist.includes(position.reserve.token.symbol))
    .map((position) => {
      return applyTransformers({ position, marketInfo, nativeAssetInfo, chainId })([
        transformNativeAssetBorrow,
        transformDefaultBorrow,
      ])
    })
    .filter((borrow): borrow is Borrow => borrow !== null) // Type guard to remove null values
}

interface BorrowTransformerParams extends GetBorrowsParams {
  position: UserPosition
  nativeAssetInfo: NativeAssetInfo
  chainId: number
}

function transformNativeAssetBorrow({
  position,
  marketInfo,
  nativeAssetInfo,
  chainId,
}: BorrowTransformerParams): Borrow | undefined {
  if (position.reserve.token.symbol !== nativeAssetInfo.wrappedNativeAssetSymbol) {
    return undefined
  }
  const borrow = transformDefaultBorrow({ position, marketInfo, nativeAssetInfo, chainId })

  return {
    ...borrow,
    available: position.reserve.availableLiquidity,
    debt: position.borrowBalance,
    borrowAPY: position.reserve.variableBorrowApy,
  }
}
function transformDefaultBorrow({ position, marketInfo, chainId }: BorrowTransformerParams): BorrowEntryRowData {
  const available = getBorrowableAmount({
    tokenIdentifier: position.reserve.token.symbol,
    facilitatorAvailable: marketInfo.facilitatorBorrowLimit,
    defaultAvailable: position.reserve.availableLiquidity,
  })

  return {
    token: position.reserve.token,
    reserveStatus: position.reserve.status,
    available,
    debt: position.borrowBalance,
    borrowAPY: position.reserve.variableBorrowApy,
    rowClickOptions: {
      destination: paths.marketDetails
        .replace(':chainId', chainId.toString())
        .replace(':asset', position.reserve.token.address),
    },
  }
}
