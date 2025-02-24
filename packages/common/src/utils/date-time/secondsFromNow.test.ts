import { millisecondsToSeconds } from 'date-fns'
import { describe, expect, it } from 'vitest'

import { getSeconds } from './seconds'
import { secondsFromNow } from './secondsFromNow'

const currentTimestamp = () => Date.now()

describe('secondsFromNow', () => {
  it('should return 0 when no timestamp is provided', () => {
    expect(secondsFromNow()).toBe(0)
  })

  it('should return the correct number of seconds', () => {
    const timestampInSeconds = millisecondsToSeconds(currentTimestamp() + getSeconds({ seconds: 15 }))

    expect(secondsFromNow(timestampInSeconds)).toBeCloseTo(getSeconds({ seconds: 15 }))
  })

  it('should handle negative timestamp values', () => {
    const timestampInSeconds = millisecondsToSeconds(currentTimestamp() - getSeconds({ seconds: 15 }))

    expect(secondsFromNow(timestampInSeconds)).toBeCloseTo(-getSeconds({ seconds: 15 }))
  })
})
