import { faker } from '@faker-js/faker'
import { ETHER_DECIMALS } from 'common'
import { describe, expect, it } from 'vitest'

import { formatCurrency } from '@/astaria/utils/currency/formatCurrency'

describe('formatCurrency', () => {
  it('should handle a regular number type', () => {
    const amount = faker.number.int({ max: 999 })
    expect(formatCurrency({ amount, usdValue: null })).toEqual({
      content: `${amount}`,
      trigger: `${amount}`,
    })
  })
  it('should handle a decimal', () => {
    const amount = faker.number.float({ precision: 0.01 })
    expect(formatCurrency({ amount, usdValue: null })).toEqual({
      content: `${amount}`,
      trigger: `${amount}`,
    })
  })
  it('should add commas to number values', () => {
    const amount = 1234.56789
    expect(formatCurrency({ amount, usdValue: null })).toEqual({
      content: '1,234.56789',
      trigger: '1,234.5679',
    })
  })
  it('should handle a BigInt', () => {
    const baseValue = faker.number.int({ max: 999 })
    const amount = BigInt(baseValue)
    expect(formatCurrency({ amount, usdValue: null })).toEqual({
      content: `${baseValue}`,
      trigger: `${baseValue}`,
    })
  })
  it('should add commas to bigint values', () => {
    const amount = 1234567890000000000000n
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: null })).toEqual({
      content: '1,234.56789',
      trigger: '1,234.5679',
    })
  })
  it('should handle full 18 decimals', () => {
    const amount = 4123456789012345678901n
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: null })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.4568',
    })
  })
  it('should handle a poor backend structure', () => {
    const amount = 28n
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: null })).toEqual({
      content: '0.000000000000000028',
      trigger: '0',
    })
  })
  it('should give the correct decimal places', () => {
    const amount = 4123456789012345678901n
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 0.01 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 0.1 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.5',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 1 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.46',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 3 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.457',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 5000 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.4568',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 20000 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.45679',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 45000 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.456789',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 75000 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.456789',
    })
    expect(formatCurrency({ amount, decimals: ETHER_DECIMALS, usdValue: 120000 })).toEqual({
      content: '4,123.456789012345678901',
      trigger: '4,123.45678901',
    })
  })
  it('should show a small message instead', () => {
    expect(
      formatCurrency({
        amount: 41234567890123456n,
        decimals: ETHER_DECIMALS,
        usdValue: 0.01,
      }),
    ).toEqual({
      content: '0.041234567890123456',
      trigger: '<0.1',
    })
    expect(
      formatCurrency({
        amount: 4123456789012345n,
        decimals: ETHER_DECIMALS,
        usdValue: 0.1,
      }),
    ).toEqual({
      content: '0.004123456789012345',
      trigger: '<0.1',
    })
    expect(
      formatCurrency({
        amount: 412345678901234n,
        decimals: ETHER_DECIMALS,
        usdValue: 1,
      }),
    ).toEqual({
      content: '0.000412345678901234',
      trigger: '<0.01',
    })
    expect(
      formatCurrency({
        amount: 41234567890123n,
        decimals: ETHER_DECIMALS,
        usdValue: 3,
      }),
    ).toEqual({
      content: '0.000041234567890123',
      trigger: '<0.001',
    })
    expect(
      formatCurrency({
        amount: 4123456789012n,
        decimals: ETHER_DECIMALS,
        usdValue: 5000,
      }),
    ).toEqual({
      content: '0.000004123456789012',
      trigger: '<0.0001',
    })
    expect(
      formatCurrency({
        amount: 412345678901n,
        decimals: ETHER_DECIMALS,
        usdValue: 20000,
      }),
    ).toEqual({
      content: '0.000000412345678901',
      trigger: '<0.00001',
    })
    expect(
      formatCurrency({
        amount: 41234567890n,
        decimals: ETHER_DECIMALS,
        usdValue: 45000,
      }),
    ).toEqual({
      content: '0.00000004123456789',
      trigger: '<0.000001',
    })
    expect(
      formatCurrency({
        amount: 4123456789n,
        decimals: ETHER_DECIMALS,
        usdValue: 75000,
      }),
    ).toEqual({
      content: '0.000000004123456789',
      trigger: '<0.0000001',
    })
    expect(
      formatCurrency({
        amount: 412345678n,
        decimals: ETHER_DECIMALS,
        usdValue: 120000,
      }),
    ).toEqual({
      content: '0.000000000412345678',
      trigger: '<0.00000001',
    })
  })
})
