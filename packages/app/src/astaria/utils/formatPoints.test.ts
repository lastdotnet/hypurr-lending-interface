import { numberToBigInt } from 'common'
import { describe, expect, it } from 'vitest'

import { formatPoints } from '@/astaria/utils/formatPoints'

describe('formatAstrologicalUnits', () => {
  it('should handle singular digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 1 }))).toEqual({
      content: `1`,
      trigger: `1`,
    })
  })
  it('should handle ten digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 12 }))).toEqual({
      content: `12`,
      trigger: `12`,
    })
  })
  it('should handle hundred digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 123 }))).toEqual({
      content: `123`,
      trigger: `123`,
    })
  })
  it('should handle thousand digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 1234 }))).toEqual({
      content: `1,234`,
      trigger: `1,234`,
    })
  })
  it('should handle ten thousand digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 12345 }))).toEqual({
      content: `12,345`,
      trigger: `12.3K`,
    })
  })
  it('should handle hundred thousand digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 123456 }))).toEqual({
      content: `123,456`,
      trigger: `123.5K`,
    })
  })
  it('should handle million digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 1234567 }))).toEqual({
      content: `1,234,567`,
      trigger: `1.2M`,
    })
  })
  it('should handle ten million digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 12345678 }))).toEqual({
      content: `12,345,678`,
      trigger: `12.3M`,
    })
  })
  it('should handle hundred million digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 123456789 }))).toEqual({
      content: `123,456,789`,
      trigger: `123.5M`,
    })
  })
  it('should handle billion digits', () => {
    expect(formatPoints(numberToBigInt({ amount: 1234567890 }))).toEqual({
      content: `1,234,567,890`,
      trigger: `1.2B`,
    })
  })
})
