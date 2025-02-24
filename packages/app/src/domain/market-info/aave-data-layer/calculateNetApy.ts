import type { AaveFormattedReserve, AaveUserSummary } from './query'

import { Percentage } from '@/domain/types/NumericValues'
import { weightedAverageAPY } from '@/utils/ghoUtils'
import { displayGhoForMintableMarket } from '@/utils/ghoUtils'
import { FormattedGhoUserData } from '@aave/math-utils'
import { FormattedGhoReserveData } from '@aave/math-utils'
import BigNumber from 'bignumber.js'

export interface NetApyDetails {
  netSupplyApy: Percentage
  netBorrowApy: Percentage
  totalNetApy: Percentage
}

/**
 * Calculates a user's net APY across all deposits and borrows, using the same
 * logic as Aave’s official dashboard:
 *
 * 1) For each deposited asset:
 *    - Add (depositUSD × depositAPY) to the "positiveProportion"
 *    - If there are deposit incentives, add (depositUSD × incentiveAPR) as well
 *
 * 2) For each borrowed asset:
 *    - Add (borrowUSD × borrowAPY) to the "negativeProportion"
 *    - If there are borrow incentives, add (borrowUSD × incentiveAPR) to "positiveProportion"
 *
 * 3) Compute the weighted supply and borrow APYs:
 *
 *    netSupplyApy = positiveProportion / totalLiquidityUSD
 *    netBorrowApy = negativeProportion / totalBorrowsUSD
 *
 * 4) Derive totalNetApy relative to the user's net worth:
 *
 *    totalNetApy =
 *      (netSupplyApy * (totalLiquidityUSD / netWorthUSD)) -
 *      (netBorrowApy * (totalBorrowsUSD / netWorthUSD))
 *
 * EXAMPLE:
 *   Assume the user:
 *     - Deposits $1,000 at 5% (APY = 0.05), so deposit interest/year = 1000 × 0.05 = $50
 *     - Borrows $500 at 15% (APY = 0.15), so borrow cost/year = 500 × 0.15 = $75
 *   Then:
 *     positiveProportion = $50
 *     negativeProportion = $75
 *     totalLiquidityUSD = $1,000
 *     totalBorrowsUSD = $500
 *     netWorthUSD = $1,000 - $500 = $500
 *
 *   netSupplyApy = 50 / 1000 = 0.05  (5.0%)
 *   netBorrowApy = 75 / 500 = 0.15  (15.0%)
 *
 *   totalNetApy =
 *     (0.05 × (1000 / 500)) - (0.15 × (500 / 500))
 *     = (0.05 × 2) - (0.15 × 1)
 *     = 0.10 - 0.15
 *     = -0.05    (-5.0%)
 *
 * Thus the user's overall net APY, relative to net worth, is -5%.
 */

export function calculateNetApy(
  userSummary: AaveUserSummary,
  formattedReserves: AaveFormattedReserve[],
  formattedGhoReserveData?: FormattedGhoReserveData,
  formattedGhoUserData?: FormattedGhoUserData,
  currentMarket?: string,
): NetApyDetails {
  const proportions = userSummary.userReservesData.reduce(
    (acc, value) => {
      const reserve = formattedReserves.find((r) => r.underlyingAsset === value.reserve.underlyingAsset)

      if (reserve) {
        if (value.underlyingBalanceUSD !== '0') {
          acc.positiveProportion = acc.positiveProportion.plus(
            new BigNumber(reserve.supplyAPY).multipliedBy(value.underlyingBalanceUSD),
          )
          if (reserve.aIncentivesData) {
            for (const incentive of reserve.aIncentivesData) {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.underlyingBalanceUSD),
              )
            }
          }
        }
        if (value.variableBorrowsUSD !== '0') {
          // @TODO: We do not currently fetch this data. Will need to be implemented to support this.
          if (
            currentMarket &&
            displayGhoForMintableMarket({
              symbol: reserve.symbol,
              currentMarket,
            }) &&
            formattedGhoUserData &&
            formattedGhoReserveData
          ) {
            const borrowRateAfterDiscount = weightedAverageAPY(
              formattedGhoReserveData.ghoVariableBorrowAPY,
              formattedGhoUserData.userGhoBorrowBalance,
              formattedGhoUserData.userGhoAvailableToBorrowAtDiscount,
              formattedGhoReserveData.ghoBorrowAPYWithMaxDiscount,
            )
            acc.negativeProportion = acc.negativeProportion.plus(
              new BigNumber(borrowRateAfterDiscount).multipliedBy(formattedGhoUserData.userGhoBorrowBalance),
            )
            if (reserve.vIncentivesData) {
              for (const incentive of reserve.vIncentivesData) {
                acc.positiveProportion = acc.positiveProportion.plus(
                  new BigNumber(incentive.incentiveAPR).multipliedBy(formattedGhoUserData.userGhoBorrowBalance),
                )
              }
            }
          } else {
            acc.negativeProportion = acc.negativeProportion.plus(
              new BigNumber(reserve.variableBorrowAPY).multipliedBy(value.variableBorrowsUSD),
            )
            if (reserve.vIncentivesData) {
              for (const incentive of reserve.vIncentivesData) {
                acc.positiveProportion = acc.positiveProportion.plus(
                  new BigNumber(incentive.incentiveAPR).multipliedBy(value.variableBorrowsUSD),
                )
              }
            }
          }
        }
      } else {
        throw new Error('no possible to calculate net apy')
      }

      return acc
    },
    {
      positiveProportion: new BigNumber(0),
      negativeProportion: new BigNumber(0),
    },
  )

  const netSupplyApy =
    userSummary.totalLiquidityUSD !== '0'
      ? proportions.positiveProportion.dividedBy(userSummary.totalLiquidityUSD).toNumber()
      : 0

  const netBorrowApy =
    userSummary.totalBorrowsUSD !== '0'
      ? proportions.negativeProportion.dividedBy(userSummary.totalBorrowsUSD).toNumber()
      : 0

  const totalNetApy =
    userSummary.netWorthUSD !== '0'
      ? (netSupplyApy * Number(userSummary.totalLiquidityUSD)) / Number(userSummary.netWorthUSD) -
        (netBorrowApy * Number(userSummary.totalBorrowsUSD)) / Number(userSummary.netWorthUSD)
      : 0
  return {
    netSupplyApy: Percentage(netSupplyApy, true),
    netBorrowApy: Percentage(netBorrowApy, true),
    totalNetApy: Percentage(totalNetApy, true, true),
  }
}
