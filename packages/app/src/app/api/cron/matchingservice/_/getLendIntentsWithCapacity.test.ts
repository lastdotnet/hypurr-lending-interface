import { describe, expect, it } from 'vitest'

import { getCapacity } from '@/app/api/cron/matchingservice/_/getLendIntentsWithCapacity'
import { mockLendIntent } from '@/app/api/cron/matchingservice/_/mockTestData'

describe('getLendIntentsWithCapacity', () => {
  describe('getCapacity', () => {
    it('should return the balance if the user has more allowance than their balance', () => {
      const allowance = 100n
      const balance = 5n
      expect(
        getCapacity({
          allowance,
          balance,
          lendIntent: {
            ...mockLendIntent,
            maxAmount: allowance + 10n,
          },
        }),
      ).toBe(balance)
    })
    it('should return the allowance if the user has less allowance than their balance', () => {
      const allowance = 7n
      const balance = 100n
      expect(
        getCapacity({
          allowance,
          balance,
          lendIntent: {
            ...mockLendIntent,
            maxAmount: balance + 10n,
          },
        }),
      ).toBe(allowance)
    })
    it('should return the lend intent max amount if it is less than the capacity', () => {
      const allowance = 100n
      const balance = 99n
      const lendIntentMaxAmount = allowance - 10n
      expect(
        getCapacity({
          allowance,
          balance,
          lendIntent: {
            ...mockLendIntent,
            maxAmount: lendIntentMaxAmount,
          },
        }),
      ).toBe(lendIntentMaxAmount)
    })
  })
})
