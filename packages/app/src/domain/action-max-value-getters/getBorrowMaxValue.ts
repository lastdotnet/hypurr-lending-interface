import BigNumber from 'bignumber.js'

import { NormalizedUnitNumber } from '../types/NumericValues'
import { CheckedAddress } from '../types/CheckedAddress'

interface GetBorrowMaxValueParams {
  asset: {
    availableLiquidity: NormalizedUnitNumber
    totalDebt: NormalizedUnitNumber
    borrowCap?: NormalizedUnitNumber
    address?: CheckedAddress
  }
  user: {
    maxBorrowBasedOnCollateral: NormalizedUnitNumber
    inIsolationMode?: boolean
    isolationModeCollateralTotalDebt?: NormalizedUnitNumber
    isolationModeCollateralDebtCeiling?: NormalizedUnitNumber
  }
  validationIssue?: string
}

export function getBorrowMaxValue({ asset, user, validationIssue }: GetBorrowMaxValueParams): NormalizedUnitNumber {
  if (
    validationIssue === 'reserve-not-active' ||
    validationIssue === 'reserve-borrowing-disabled' ||
    validationIssue === 'asset-not-borrowable-in-isolation' ||
    validationIssue === 'siloed-mode-cannot-enable' ||
    validationIssue === 'siloed-mode-enabled' ||
    validationIssue === 'emode-category-mismatch'
  ) {
    return NormalizedUnitNumber(0)
  }

  const ceilings = [
    // @NOTE: USDXL needs a custom limit since its liquidity is 0
    // @TODO: Get this custom limit from facilitator limit and/or mint limit
    asset.address === CheckedAddress('0x17a44c591ac723D76050Fe6bf02B49A0CC8F3994')
      ? 100000000
      : asset.availableLiquidity,
    user.maxBorrowBasedOnCollateral.multipliedBy(0.99), // take 99% of the max borrow value to ensure that liquidation is not triggered right after the borrow
  ]

  if (asset.borrowCap) {
    ceilings.push(NormalizedUnitNumber(asset.borrowCap.minus(asset.totalDebt)))
  }

  const { inIsolationMode, isolationModeCollateralTotalDebt, isolationModeCollateralDebtCeiling } = user

  if (inIsolationMode && isolationModeCollateralTotalDebt && isolationModeCollateralDebtCeiling) {
    ceilings.push(NormalizedUnitNumber(isolationModeCollateralDebtCeiling.minus(isolationModeCollateralTotalDebt)))
  }

  return NormalizedUnitNumber(BigNumber.max(BigNumber.min(...ceilings), 0))
}
