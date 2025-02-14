import { HexSchema } from 'common'
import { describe, expect, it } from 'vitest'

import { ITEM_TYPES_DONT_MATCH_ERROR, isMatch } from '@/app/api/cron/matchingservice/_/isMatch'
import { mockBorrowIntent, mockLendIntentWithCapacity } from '@/app/api/cron/matchingservice/_/mockTestData'

import { ItemType } from 'sdk'

const baseIsMatchParams = {
  // this is a true return to ensure all the false checks work
  borrowIntent: mockBorrowIntent,
  borrowIntentSettlementParams: HexSchema.parse('0x123'),
  currentAPY: 100n,
  lendIntent: { ...mockLendIntentWithCapacity, minAPY: 100n },
  lendIntentSettlementParams: HexSchema.parse('0x123'),
}

describe('isMatch', () => {
  it('should return false if the borrow intent settlement params don’t match the lend intent settlement params', () => {
    expect(
      isMatch({
        ...baseIsMatchParams,
        lendIntentSettlementParams: HexSchema.parse('0x123456'),
      }),
    ).toBe(false)
  })
  it('should return false if amount bounds don’t match', () => {
    const lendIntentMaxAmount = 100n
    const lendIntentCapacity = lendIntentMaxAmount - 5n
    expect(
      isMatch({
        ...baseIsMatchParams,
        borrowIntent: {
          ...baseIsMatchParams.borrowIntent,
          minAmount: lendIntentCapacity + 5n,
        },
        lendIntent: {
          ...baseIsMatchParams.lendIntent,
          capacity: lendIntentCapacity,
          maxAmount: lendIntentMaxAmount,
        },
      }),
    ).toBe(false)
  })
  it('should return false if both the borrowIntent and lendIntent collaterals are ERC20s and the borrow intent collateral amount is less than the lend intent collateral amount', () => {
    expect(
      isMatch({
        ...baseIsMatchParams,
        borrowIntent: {
          ...baseIsMatchParams.borrowIntent,
          collateral: [{ ...baseIsMatchParams.borrowIntent.collateral[0], amount: 10n }],
        },
        lendIntent: {
          ...baseIsMatchParams.lendIntent,
          collateral: [{ ...baseIsMatchParams.borrowIntent.collateral[0], amount: 100n }],
        },
      }),
    ).toBe(false)
  })
  it('should return false if both the borrowIntent and lendIntent collaterals are ERC721s and the identifiers don’t match', () => {
    expect(
      isMatch({
        ...baseIsMatchParams,
        borrowIntent: {
          ...baseIsMatchParams.borrowIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              identifier: 1234n,
              itemType: ItemType.ERC721,
            },
          ],
        },
        lendIntent: {
          ...baseIsMatchParams.lendIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              identifier: 123n,
              itemType: ItemType.ERC721,
            },
          ],
        },
      }),
    ).toBe(false)
  })
  it('should return true if both the borrowIntent and lendIntent collaterals are ERC721s and the identifiers match', () => {
    expect(
      isMatch({
        ...baseIsMatchParams,
        borrowIntent: {
          ...baseIsMatchParams.borrowIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              itemType: ItemType.ERC721,
            },
          ],
        },
        lendIntent: {
          ...baseIsMatchParams.lendIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              itemType: ItemType.ERC721,
            },
          ],
        },
      }),
    ).toBe(true)
  })
  it('should throw an error if the collateral item types don’t match', () => {
    expect(() =>
      isMatch({
        ...baseIsMatchParams,
        borrowIntent: {
          ...baseIsMatchParams.borrowIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              itemType: ItemType.ERC20,
            },
          ],
        },
        lendIntent: {
          ...baseIsMatchParams.lendIntent,
          collateral: [
            {
              ...baseIsMatchParams.borrowIntent.collateral[0],
              itemType: ItemType.ERC721,
            },
          ],
        },
      }),
    ).toThrowError(ITEM_TYPES_DONT_MATCH_ERROR)
  })
  it('should return false if the currentAPY is less than the lend intent minAPY', () => {
    const currentAPY = 100n

    expect(
      isMatch({
        ...baseIsMatchParams,
        currentAPY,
        lendIntent: { ...mockLendIntentWithCapacity, minAPY: currentAPY + 5n },
      }),
    ).toBe(false)
  })
  it('should return true if the currentAPY is greater than or equal to the lend intent minAPY', () => {
    const currentAPY = 100n

    expect(isMatch(baseIsMatchParams)).toBe(true) // equal
    expect(
      isMatch({
        ...baseIsMatchParams,
        currentAPY,
        lendIntent: { ...mockLendIntentWithCapacity, minAPY: currentAPY - 5n },
      }),
    ).toBe(true) // greater than
  })
})
