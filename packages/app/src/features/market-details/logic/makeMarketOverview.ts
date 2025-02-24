import { MarketInfo, Reserve } from '@/domain/market-info/marketInfo'

import { CapAutomatorInfo } from '@/domain/cap-automator/types'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { getBorrowableAmount } from '@/utils/getBorrowableAmount'
import { MarketOverview } from '../types'
import { getReserveEModeCategoryTokens } from './getReserveEModeCategoryTokens'
import { getSparkAirdropDetails } from './getSparkAirdropDetails'

export interface MakeMarketOverviewParams {
  marketInfo: MarketInfo
  reserve: Reserve
  capAutomatorInfo: CapAutomatorInfo
  facilitatorBorrowLimit: NormalizedUnitNumber
}

export function makeMarketOverview({
  reserve,
  marketInfo,
  capAutomatorInfo,
  facilitatorBorrowLimit,
}: MakeMarketOverviewParams): MarketOverview {
  const eModeCategoryId = reserve.eModeCategory?.id
  const eModeCategoryTokens = getReserveEModeCategoryTokens(marketInfo, reserve)
  const { hasAirdropForBorrowing, hasAirdropForSupplying } = getSparkAirdropDetails({
    marketInfo,
    token: reserve.token.symbol,
  })

  const available = getBorrowableAmount({
    tokenIdentifier: reserve.token.address,
    facilitatorAvailable: facilitatorBorrowLimit,
    defaultAvailable: reserve.availableLiquidity,
  })

  return {
    supply: {
      hasSparkAirdrop: hasAirdropForSupplying,
      status: reserve.supplyAvailabilityStatus,
      totalSupplied: reserve.totalLiquidity,
      supplyCap: reserve.supplyCap,
      apy: reserve.supplyAPY,
      capAutomatorInfo: capAutomatorInfo.supplyCap,
    },
    collateral: {
      status: reserve.collateralEligibilityStatus,
      token: reserve.token,
      maxLtv: reserve.maxLtv,
      liquidationThreshold: reserve.liquidationThreshold,
      liquidationPenalty: reserve.liquidationBonus,
      isolationModeInfo: { debt: reserve.isolationModeTotalDebt, debtCeiling: reserve.debtCeiling },
    },
    borrow: {
      hasSparkAirdrop: hasAirdropForBorrowing,
      status: reserve.borrowEligibilityStatus,
      totalBorrowed: reserve.totalDebt,
      borrowCap: reserve.borrowCap,
      apy: reserve.variableBorrowApy,
      reserveFactor: reserve.reserveFactor,
      chartProps: {
        utilizationRate: reserve.utilizationRate,
        optimalUtilizationRate: reserve.optimalUtilizationRate,
        variableRateSlope1: reserve.variableRateSlope1,
        variableRateSlope2: reserve.variableRateSlope2,
        baseVariableBorrowRate: reserve.baseVariableBorrowRate,
      },
      capAutomatorInfo: capAutomatorInfo.borrowCap,
    },
    summary: {
      type: 'default',
      marketSize: reserve.totalLiquidity,
      utilizationRate: reserve.utilizationRate,
      borrowed: reserve.totalDebt,
      available,
    },
    ...(eModeCategoryId === 1 || eModeCategoryId === 2
      ? {
          eMode: {
            maxLtv: reserve.eModeCategory!.ltv,
            liquidationThreshold: reserve.eModeCategory!.liquidationThreshold,
            liquidationPenalty: reserve.eModeCategory!.liquidationBonus,
            categoryId: eModeCategoryId,
            eModeCategoryTokens,
          },
        }
      : {}),
  }
}
