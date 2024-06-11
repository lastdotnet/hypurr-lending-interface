import { SwapInfo, SwapParams } from '@/domain/exchanges/types'
import { MarketInfo } from '@/domain/market-info/marketInfo'
import { SavingsInfo } from '@/domain/savings-info/types'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { WalletInfo } from '@/domain/wallet/useWalletInfo'
import { DialogFormNormalizedData } from '@/features/dialogs/common/logic/form'
import { RouteItem, SavingsDialogTxOverview } from '../../common/types'

export interface CreateTxOverviewParams {
  marketInfo: MarketInfo
  savingsInfo: SavingsInfo
  swapInfo: SwapInfo
  swapParams: SwapParams
  walletInfo: WalletInfo
}
export function createTxOverview({
  marketInfo,
  walletInfo,
  savingsInfo,
  swapInfo,
  swapParams,
}: CreateTxOverviewParams): SavingsDialogTxOverview {
  const sDAI = marketInfo.sDAI
  const DAI = marketInfo.DAI
  const showExchangeRate = swapParams.fromToken.symbol !== marketInfo.DAI.symbol

  if (!swapInfo.data) {
    return swapInfo.isLoading
      ? { type: 'lifi', showExchangeRate, status: 'loading' }
      : { type: 'lifi', showExchangeRate, status: 'no-overview' }
  }

  const sDaiAmountBaseUnit = swapInfo.data.estimate.toAmount
  const sDaiAmount = sDAI.fromBaseUnit(sDaiAmountBaseUnit)
  const otherTokenAmountBaseUnit = swapInfo.data.estimate.fromAmount
  const otherTokenAmount = swapParams.fromToken.fromBaseUnit(otherTokenAmountBaseUnit)

  const daiAmountNormalized = savingsInfo.convertSharesToDai({
    shares: sDaiAmount,
  })
  const tokenToDaiRatio = NormalizedUnitNumber(daiAmountNormalized.dividedBy(otherTokenAmount))

  const sDaiBalanceBefore = walletInfo.findWalletBalanceForToken(sDAI)
  const sDaiBalanceAfter = NormalizedUnitNumber(sDaiBalanceBefore.plus(sDaiAmount))

  return {
    type: 'lifi',
    status: 'success',
    showExchangeRate,
    exchangeRatioFromToken: swapParams.fromToken,
    exchangeRatioToToken: DAI,
    sDaiToken: sDAI,
    exchangeRatio: tokenToDaiRatio,
    sDaiBalanceBefore,
    sDaiBalanceAfter,
    APY: savingsInfo.apy,
    outTokenAmount: otherTokenAmount,
  }
}

export interface CreateMakerTxOverviewParams {
  formValues: DialogFormNormalizedData
  marketInfo: MarketInfo
  savingsInfo: SavingsInfo
}
export function createMakerTxOverview({
  formValues,
  marketInfo,
  savingsInfo,
}: CreateMakerTxOverviewParams): SavingsDialogTxOverview {
  const daiValue = formValues.value
  if (daiValue.eq(0)) {
    return { type: 'maker', status: 'no-overview' }
  }

  const sDAIValue = savingsInfo.convertDaiToShares({ dai: daiValue })
  const daiEarnRate = NormalizedUnitNumber(daiValue.multipliedBy(savingsInfo.apy))
  const route: RouteItem[] = [
    {
      token: marketInfo.DAI,
      value: daiValue,
      usdValue: daiValue,
    },
    {
      token: marketInfo.sDAI,
      value: sDAIValue,
      usdValue: savingsInfo.convertSharesToDai({ shares: sDAIValue }),
    },
  ]

  return {
    type: 'maker',
    status: 'success',
    APY: savingsInfo.apy,
    daiEarnRate,
    route,
    makerBadgeToken: marketInfo.DAI,
    outTokenAmount: sDAIValue,
  }
}