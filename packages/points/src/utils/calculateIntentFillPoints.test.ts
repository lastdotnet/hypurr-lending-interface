import { secondsInDay } from 'date-fns/constants'
import { describe, expect, it } from 'vitest'

import { ETHER_DECIMALS, numberToBigInt } from 'common'

import { MAX_POINTS_PER_INTENT_FILL, calculateIntentFillPoints } from './calculateIntentFillPoints'

const EXAMPLE_TIMESTAMP = 1714479156
const secondsInTwoDays = secondsInDay * 2
const USD_VALUE = 1000

describe('calculateIntentFillPoints', () => {
  describe('default 24hr deadline', () => {
    it('max points for start of intent', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInDay,
            currentTimestamp: EXAMPLE_TIMESTAMP,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInDay),
            usdValue: USD_VALUE,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(
        numberToBigInt({
          amount: MAX_POINTS_PER_INTENT_FILL,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('0 points for end of intent', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInDay,
            currentTimestamp: EXAMPLE_TIMESTAMP + secondsInDay,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInDay),
            usdValue: USD_VALUE,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(numberToBigInt({ amount: 0, decimals: ETHER_DECIMALS }))
    })
  })
  describe('48hr deadline', () => {
    it('max points for start of intent', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInTwoDays,
            currentTimestamp: EXAMPLE_TIMESTAMP,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInTwoDays),
            usdValue: USD_VALUE,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(
        numberToBigInt({
          amount: MAX_POINTS_PER_INTENT_FILL,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('half points on the first day', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInTwoDays,
            currentTimestamp: EXAMPLE_TIMESTAMP + secondsInDay,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInTwoDays),
            usdValue: USD_VALUE,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(
        numberToBigInt({
          amount: MAX_POINTS_PER_INTENT_FILL / 2,
          decimals: ETHER_DECIMALS,
        }),
      )
    })
    it('0 points on the deadline day', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInTwoDays,
            currentTimestamp: EXAMPLE_TIMESTAMP + secondsInTwoDays,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInTwoDays),
            usdValue: USD_VALUE,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(numberToBigInt({ amount: 0, decimals: ETHER_DECIMALS }))
    })
  })
  describe('usdValue check', () => {
    it('should return 1000 for start of intent if usdValue >= 1000', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInTwoDays,
            currentTimestamp: EXAMPLE_TIMESTAMP,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInTwoDays),
            usdValue: USD_VALUE + 100,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(numberToBigInt({ amount: USD_VALUE, decimals: ETHER_DECIMALS }))
    })
    it('should return less than 1000 points for start of intent if usdValue <= 1000', () => {
      const result = numberToBigInt({
        amount:
          calculateIntentFillPoints({
            caveatDuration: secondsInTwoDays,
            currentTimestamp: EXAMPLE_TIMESTAMP,
            endTimestamp: Number(EXAMPLE_TIMESTAMP + secondsInTwoDays),
            usdValue: USD_VALUE - 100,
          }) ?? 0,
        decimals: ETHER_DECIMALS,
      })
      expect(result).toStrictEqual(numberToBigInt({ amount: USD_VALUE - 100, decimals: ETHER_DECIMALS }))
    })
  })
})
