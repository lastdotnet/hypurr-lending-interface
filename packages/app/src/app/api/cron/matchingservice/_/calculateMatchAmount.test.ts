import { describe, expect, it } from 'vitest'

import { calculateMatchAmount } from '@/app/api/cron/matchingservice/_/calculateMatchAmount'
import { mockBorrowIntent, mockLendIntent } from '@/app/api/cron/matchingservice/_/mockTestData'

describe('calculateMatchAmount', () => {
  it('should return the matched amount', () => {
    const result = calculateMatchAmount({
      borrowIntent: mockBorrowIntent,
      capacity: 1n,
      lendIntent: mockLendIntent,
    })

    expect(result).toBe(1n)
  })
  it('should return the capacity when it is less than the lend intent max amount and less than the borrow intent max amount', () => {
    const capacity = 3n
    const result = calculateMatchAmount({
      borrowIntent: {
        ...mockBorrowIntent,
        maxAmount: capacity + 5n,
      },
      capacity,
      lendIntent: { ...mockLendIntent, maxAmount: capacity + 5n },
    })

    expect(result).toBe(capacity)
  })
  it('should return the lend intent max amount when it is less than the borrow intent max amount', () => {
    const lendIntentMaxAmount = 5n
    const result = calculateMatchAmount({
      borrowIntent: {
        ...mockBorrowIntent,
        maxAmount: lendIntentMaxAmount + 5n,
      },
      capacity: lendIntentMaxAmount + 5n,
      lendIntent: { ...mockLendIntent, maxAmount: lendIntentMaxAmount },
    })

    expect(result).toBe(lendIntentMaxAmount)
  })
  it('should return the borrow intent max amount when it is greater than or equal to the lend intent max amount', () => {
    const borrowIntentMaxAmount = 5n
    const result = calculateMatchAmount({
      borrowIntent: {
        ...mockBorrowIntent,
        maxAmount: borrowIntentMaxAmount,
      },
      capacity: borrowIntentMaxAmount + 5n,
      lendIntent: { ...mockLendIntent, maxAmount: borrowIntentMaxAmount + 5n },
    })

    expect(result).toBe(borrowIntentMaxAmount)
  })
})
