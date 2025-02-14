import { describe, expect, it } from 'vitest';

import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('should handle tiny values`', () => {
    const amount = 1e-18;
    expect(formatNumber({ amount })).toBe('0.000000000000000001');
  });
  it('should add commas to number values', () => {
    const amount = 1234.56789;
    expect(formatNumber({ amount })).toEqual('1,234.56789');
  });
  it('should handle large values`', () => {
    const amount = Number.MAX_VALUE;
    expect(formatNumber({ amount })).toBe(
      '179,769,313,486,231,600,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000'
    );
  });
  it('should cut off significant digits', () => {
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const amount = 123456789.123456789;
    expect(formatNumber({ amount })).toBe('123,456,789.1234568');
  });
  it('should cut off with given maximum decimals', () => {
    const amount = 1.23456789;
    expect(formatNumber({ amount, maxDecimals: 2 })).toBe('1.23');
  });
  it('should display dash if configured and value is 0', () => {
    expect(formatNumber({ amount: 0, useDashForZero: true })).toBe('—');
    expect(formatNumber({ amount: 1, useDashForZero: true })).toBe('1');
  });
});
