import type { AaveFormattedReserve, AaveUserSummary } from './query'

import BigNumber from 'bignumber.js'
import { Percentage } from '@/domain/types/NumericValues'

export interface NetApyDetails {
  netSupplyApy: Percentage
  netBorrowApy: Percentage
  totalNetApy: Percentage
}

/**
 * Calculates the user's net APY across all deposits and borrows, returning:
 *   - netSupplyApy: Weighted average APY of deposits (over total deposited USD)
 *   - netBorrowApy: Weighted average APY of borrows (over total borrowed USD)
 *   - totalNetApy:  Overall net APY on (deposits - borrows), weighted by total position value.
 *
 * The core formulas:
 *
 *   1. Weighted Supply APY (over total deposits)
 *      netSupplyApy = (Σ(supplyUSD_i * supplyRate_i)) / (Σ(supplyUSD_i))
 *
 *   2. Weighted Borrow APY (over total borrows)
 *      netBorrowApy = (Σ(borrowUSD_j * borrowRate_j)) / (Σ(borrowUSD_j))
 *
 *   3. Overall Net APY, considering total position:
 *      totalNetApy = (Σ(supplyUSD_i * supplyRate_i) - Σ(borrowUSD_j * borrowRate_j))
 *                    / (Σ(supplyUSD_i) + Σ(borrowUSD_j))
 *
 * Example:
 *   Suppose the user has:
 *     - $2,100 of Asset A deposited at 5% APY
 *     - $5 of Asset B deposited at 4% APY
 *     - $1,000 borrowed at 20% APY
 *
 *   Weighted Supply APY:
 *     totalSupplyUSD = 2100 + 5 = $2,105
 *     supplyEarned   = (2100 * 0.05) + (5 * 0.04) = 105 + 0.2 = 105.2
 *     netSupplyApy   = 105.2 / 2105 ≈ 0.05 (5.0%)
 *
 *   Weighted Borrow APY:
 *     totalBorrowUSD = $1,000
 *     borrowCost     = 1000 * 0.20 = 200
 *     netBorrowApy   = 200 / 1000 = 0.20 (20%)
 *
 *   Overall Net APY:
 *     totalValue   = totalSupplyUSD + totalBorrowUSD = 2105 + 1000 = $3,105
 *     netInterest  = supplyEarned - borrowCost       = 105.2 - 200 = -94.8
 *     totalNetApy  = -94.8 / 3105 ≈ -0.03052 (-3.05%)
 *
 *   So the user's netSupplyApy is ~5%, netBorrowApy is ~20%, but totalNetApy is -3.05%.
 */

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
