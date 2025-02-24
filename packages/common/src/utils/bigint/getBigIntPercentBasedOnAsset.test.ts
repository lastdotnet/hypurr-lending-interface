import { describe, expect, it } from 'vitest'

import { getBigIntPercentBasedOnDecimals } from './getBigIntPercentBasedOnAsset'

describe('getBigIntPercentBasedOnDecimals', () => {
  it('should have 10% return 1e17', () => {
    expect(
      getBigIntPercentBasedOnDecimals({
        decimals: 18,
        percent: 10n,
      }),
    ).toBe(100000000000000000n)
  })
  it('should have 100% return 1e18', () => {
    expect(
      getBigIntPercentBasedOnDecimals({
        decimals: 18,
        percent: 100n,
      }),
    ).toBe(1000000000000000000n)
  })
  it('should have 1000% return 1e19', () => {
    expect(
      getBigIntPercentBasedOnDecimals({
        decimals: 18,
        percent: 1000n,
      }),
    ).toBe(10000000000000000000n)
  })
})
