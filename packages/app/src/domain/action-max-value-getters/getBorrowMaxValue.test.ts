import { USDXL_ADDRESS } from '@/config/consts'
import { CheckedAddress } from '../types/CheckedAddress'
import { NormalizedUnitNumber } from '../types/NumericValues'
import { getBorrowMaxValue } from './getBorrowMaxValue'

describe(getBorrowMaxValue.name, () => {
  describe('USDXL handling', () => {
    const baseParams = {
      user: {
        maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
      },
      asset: {
        availableLiquidity: NormalizedUnitNumber(200),
        totalDebt: NormalizedUnitNumber(0),
      },
      facilitatorBorrowLimit: NormalizedUnitNumber(50),
    }

    it('uses facilitator limit for USDXL by address', () => {
      expect(
        getBorrowMaxValue({
          ...baseParams,
          asset: {
            ...baseParams.asset,
            address: CheckedAddress(USDXL_ADDRESS),
          },
        }),
      ).toEqual(NormalizedUnitNumber(50)) // facilitatorBorrowLimit
    })

    it('uses available liquidity for non-USDXL token', () => {
      expect(
        getBorrowMaxValue({
          ...baseParams,
          asset: {
            ...baseParams.asset,
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
        }),
      ).toEqual(NormalizedUnitNumber(99)) // maxBorrowBasedOnCollateral - safety margin
    })
  })

  describe('unlimited liquidity', () => {
    it('returns 0 when no collateral based borrow limit', () => {
      expect(
        getBorrowMaxValue({
          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(0),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns collateral based borrow limit', () => {
      expect(
        getBorrowMaxValue({
          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(99))
    })

    it('returns borrow cap based borrow limit', () => {
      expect(
        getBorrowMaxValue({
          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(50),
            borrowCap: NormalizedUnitNumber(100),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(50))
    })
  })

  describe('limited liquidity', () => {
    it('returns 0 when collateral based borrow limit 0', () => {
      expect(
        getBorrowMaxValue({
          asset: {
            availableLiquidity: NormalizedUnitNumber(10),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(0),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns available liquidity based value when smaller than borrow limit', () => {
      expect(
        getBorrowMaxValue({
          asset: {
            availableLiquidity: NormalizedUnitNumber(10),
            totalDebt: NormalizedUnitNumber(5),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(10))
    })
  })

  describe('isolation mode', () => {
    it('returns 0 when no collateral based borrow limit', () => {
      expect(
        getBorrowMaxValue({
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(0),
            inIsolationMode: true,
            isolationModeCollateralTotalDebt: NormalizedUnitNumber(0),
            isolationModeCollateralDebtCeiling: NormalizedUnitNumber(100),
          },
          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns collateral based borrow limit', () => {
      expect(
        getBorrowMaxValue({
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
            inIsolationMode: true,
            isolationModeCollateralTotalDebt: NormalizedUnitNumber(0),
            isolationModeCollateralDebtCeiling: NormalizedUnitNumber(100),
          },
          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(99))
    })

    it('returns correct value when isolation mode collateral debt and ceiling present', () => {
      expect(
        getBorrowMaxValue({
          user: {
            maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
            inIsolationMode: true,
            isolationModeCollateralTotalDebt: NormalizedUnitNumber(50),
            isolationModeCollateralDebtCeiling: NormalizedUnitNumber(100),
          },

          asset: {
            availableLiquidity: NormalizedUnitNumber(Number.POSITIVE_INFINITY),
            totalDebt: NormalizedUnitNumber(0),
            address: CheckedAddress('0x1234567890123456789012345678901234567890'),
          },
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(50))
    })
  })

  describe('existing borrow validation issue', () => {
    const userAndAsset = {
      user: {
        maxBorrowBasedOnCollateral: NormalizedUnitNumber(100),
      },
      asset: {
        availableLiquidity: NormalizedUnitNumber(100),
        totalDebt: NormalizedUnitNumber(0),
        address: CheckedAddress('0x1234567890123456789012345678901234567890'),
      },
    }

    it('returns 0 when reserve not active', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'reserve-not-active',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns 0 when reserve borrowing disabled', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'reserve-borrowing-disabled',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns 0 when asset not borrowable in isolation', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'asset-not-borrowable-in-isolation',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns 0 when siloed mode cannot enable', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'siloed-mode-cannot-enable',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns 0 when siloed mode enabled', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'siloed-mode-enabled',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })

    it('returns 0 when emode category mismatch', () => {
      expect(
        getBorrowMaxValue({
          ...userAndAsset,
          validationIssue: 'emode-category-mismatch',
          facilitatorBorrowLimit: NormalizedUnitNumber(100),
        }),
      ).toEqual(NormalizedUnitNumber(0))
    })
  })
})
