import { describe, expect, it } from 'vitest';

import { numberToBigInt } from './numberToBigInt';

describe('numberToBigInt', () => {
  it('should handle tiny values`', () => {
    const amount = 1e-18;
    expect(numberToBigInt({ amount })).toBe(1n);
  });
  it('should handle decimal values`', () => {
    const amount = Math.PI;
    expect(numberToBigInt({ amount })).toBe(3141592653589793000n);
  });
  it('should handle overly specific decimal values`', () => {
    const amount = 1.111111111111111;
    expect(numberToBigInt({ amount })).toBe(1111111111111111000n);
  });
  it('should handle very specific decimal values`', () => {
    const amount = 0.000000000000000123;
    expect(numberToBigInt({ amount })).toBe(123n);
  });
  it('should handle large values`', () => {
    const amount = Number.MAX_SAFE_INTEGER;
    expect(numberToBigInt({ amount })).toBe(
      9007199254740991000000000000000000n
    );
  });
});
