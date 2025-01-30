import { AaveFormattedReserve } from './query'

import BigNumber from 'bignumber.js'
import { AaveUserSummary } from './query'
import { Percentage } from '@/domain/types/NumericValues'

export interface NetApyDetails {
  netSupplyApy: Percentage
  netBorrowApy: Percentage
  totalNetApy: Percentage
}

export function calculateNetApy(
  userSummary: AaveUserSummary,
  formattedReserves: AaveFormattedReserve[],
): NetApyDetails {
  let totalSupplyUSD = new BigNumber(0)
  let weightedSupplyApy = new BigNumber(0)
  let totalBorrowUSD = new BigNumber(0)
  let weightedBorrowApy = new BigNumber(0)

  // Calculate weighted APY for supplies and borrows
  for (const userReserve of userSummary.userReservesData) {
    const reserve = formattedReserves.find((r) => r.underlyingAsset === userReserve.underlyingAsset)
    if (!reserve) continue

    // Supply calculations
    if (new BigNumber(userReserve.scaledATokenBalance).gt(0)) {
      const supplyUSD = new BigNumber(userReserve.underlyingBalanceUSD)
      totalSupplyUSD = totalSupplyUSD.plus(supplyUSD)

      const totalSupplyRate = new BigNumber(reserve.supplyAPY).plus(
        userReserve.reserve.aIncentivesData?.reduce(
          (sum, incentive) => sum.plus(new BigNumber(incentive.incentiveAPR)),
          new BigNumber(0),
        ) ?? new BigNumber(0),
      )

      weightedSupplyApy = weightedSupplyApy.plus(supplyUSD.multipliedBy(totalSupplyRate))
    }

    // Borrow calculations
    if (new BigNumber(userReserve.scaledVariableDebt).gt(0)) {
      const borrowUSD = new BigNumber(userReserve.variableBorrowsUSD)
      totalBorrowUSD = totalBorrowUSD.plus(borrowUSD)

      const totalBorrowRate = new BigNumber(reserve.variableBorrowAPY).plus(
        userReserve.reserve.vIncentivesData?.reduce(
          (sum, incentive) => sum.plus(new BigNumber(incentive.incentiveAPR)),
          new BigNumber(0),
        ) ?? new BigNumber(0),
      )

      weightedBorrowApy = weightedBorrowApy.plus(borrowUSD.multipliedBy(totalBorrowRate))
    }
  }

  // Calculate final weighted averages
  const netSupplyApy = totalSupplyUSD.gt(0) ? weightedSupplyApy.dividedBy(totalSupplyUSD) : new BigNumber(0)

  const netBorrowApy = totalBorrowUSD.gt(0) ? weightedBorrowApy.dividedBy(totalBorrowUSD) : new BigNumber(0)

  // Calculate total net APY (supply earnings minus borrow costs)
  const totalValue = totalSupplyUSD.plus(totalBorrowUSD)
  const totalNetApy = totalValue.gt(0)
    ? weightedSupplyApy.minus(weightedBorrowApy).dividedBy(totalValue)
    : new BigNumber(0)

  return {
    netSupplyApy: Percentage(netSupplyApy, true),
    netBorrowApy: Percentage(netBorrowApy, true),
    totalNetApy: Percentage(totalNetApy, true, true),
  }
}
