import { getBorrowableAmount } from './getBorrowableAmount'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { USDXL_ADDRESS } from '@/config/consts'

describe(getBorrowableAmount.name, () => {
  const facilitatorAmount = NormalizedUnitNumber(100)
  const defaultAmount = NormalizedUnitNumber(50)

  describe('returns facilitator amount for USDXL', () => {
    it('when using symbol', () => {
      expect(
        getBorrowableAmount({
          tokenIdentifier: TokenSymbol('USDXL'),
          facilitatorAvailable: facilitatorAmount,
          defaultAvailable: defaultAmount,
        }),
      ).toEqual(facilitatorAmount)
    })

    it('when using address', () => {
      expect(
        getBorrowableAmount({
          tokenIdentifier: CheckedAddress(USDXL_ADDRESS),
          facilitatorAvailable: facilitatorAmount,
          defaultAvailable: defaultAmount,
        }),
      ).toEqual(facilitatorAmount)
    })
  })

  describe('returns default amount for non-USDXL', () => {
    it('when using symbol', () => {
      expect(
        getBorrowableAmount({
          tokenIdentifier: TokenSymbol('USDC'),
          facilitatorAvailable: facilitatorAmount,
          defaultAvailable: defaultAmount,
        }),
      ).toEqual(defaultAmount)
    })

    it('when using address', () => {
      expect(
        getBorrowableAmount({
          tokenIdentifier: CheckedAddress('0x1234567890123456789012345678901234567890'),
          facilitatorAvailable: facilitatorAmount,
          defaultAvailable: defaultAmount,
        }),
      ).toEqual(defaultAmount)
    })
  })
})
