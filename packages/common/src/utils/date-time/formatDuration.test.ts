import { milliseconds } from 'date-fns'
import { describe, expect, it } from 'vitest'

import { formatDuration, getDurationFromMilliseconds } from './formatDuration'

describe('formatDuration', () => {
  describe('getDurationFromMilliseconds', () => {
    it('should return days and minutes', () => {
      expect(getDurationFromMilliseconds(100000)).toEqual({
        minutes: 1,
        seconds: 40,
      })
      expect(getDurationFromMilliseconds(1000000)).toEqual({
        minutes: 16,
        seconds: 40,
      })
      expect(getDurationFromMilliseconds(milliseconds({ days: 0.5 }))).toEqual({
        hours: 12,
      })
      expect(getDurationFromMilliseconds(milliseconds({ days: 1 }))).toEqual({
        days: 1,
      })
      expect(getDurationFromMilliseconds(milliseconds({ days: 5 }))).toEqual({
        days: 5,
      })
      expect(getDurationFromMilliseconds(milliseconds({ days: 5.27 }))).toEqual({
        days: 5,
        hours: 6,
        minutes: 28,
        seconds: 47,
      })
      expect(getDurationFromMilliseconds(milliseconds({ days: 66 }))).toEqual({
        days: 66,
      })
    })
  })
  describe('formatDuration', () => {
    it('should return nothing is the duration has passed', () => {
      const durationPassed = formatDuration({ milliseconds: -100 })
      expect(durationPassed).toBeUndefined()
      expect(durationPassed).toBeUndefined()
    })
    it('should handle pluralization', () => {
      expect(formatDuration({ milliseconds: 100000 })).toEqual('1m 40s')
      expect(formatDuration({ milliseconds: 1000000 })).toEqual('16m 40s')
      expect(formatDuration({ milliseconds: milliseconds({ days: 1 }) })).toEqual('1d')
      expect(formatDuration({ milliseconds: milliseconds({ days: 5 }) })).toEqual('5d')
    })
    it('should handle durations over DAYS_CUTOFF correctly', () => {
      expect(formatDuration({ milliseconds: milliseconds({ days: 2.25 }) })).toEqual('2d 6h')
      expect(formatDuration({ milliseconds: milliseconds({ days: 14 }) })).toEqual('14d')
    })
    it('should show short durations correctly', () => {
      expect(formatDuration({ milliseconds: 10000 })).toEqual('10s')
      expect(formatDuration({ milliseconds: 60000 })).toEqual('1m')
      expect(formatDuration({ milliseconds: 61000 })).toEqual('1m 1s')
    })
  })
})
