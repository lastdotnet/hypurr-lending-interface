import { parseUnits } from 'viem';
import { describe, expect, it } from 'vitest';

import { toNormalizedString, toNormalizedValue } from './normalize';

describe('normalize', () => {
  describe('toNormalizedValue', () => {
    it('should return value as a number', () => {
      const value = '24.56479863438';
      const bigIntValue = parseUnits(value, 18);

      const result = toNormalizedValue(bigIntValue);

      expect(result).toBe(Number(value));
    });

    it('should not go beyond the maximum supported digits for JS', () => {
      const value = '1234567890.12345678901234567890';
      const bigIntValue = parseUnits(value, 18);

      const result = toNormalizedValue(bigIntValue);

      expect(String(result)).toBe('1234567890.123456');
    });

    it('should not round poorly', () => {
      const value = '24564798634382654666';
      const bigIntValue = parseUnits(value, 18);

      const result = toNormalizedValue(bigIntValue);

      expect(String(result)).toBe('2456479863438265');
    });

    it('should handle custom decimals', () => {
      const bigIntValue = 1234n;

      const result = toNormalizedValue(bigIntValue, 3);

      expect(String(result)).toBe('1.234');
    });
  });

  describe('toNormalizedString', () => {
    it('should return value as a number', () => {
      const value = '24.56479863438';
      const bigIntValue = parseUnits(value, 18);

      const result = toNormalizedString(bigIntValue);

      expect(result).toBe(value);
    });

    it('should not go beyond Ethereum max units', () => {
      const value = '1234567890.12345678901234567890123456';
      const bigIntValue = parseUnits(value, 18);

      const result = toNormalizedString(bigIntValue);

      expect(result).toBe('1234567890.123456789012345679');
    });

    it('should handle custom decimals', () => {
      const bigIntValue = 1234n;

      const result = toNormalizedString(bigIntValue, 3);

      expect(result).toBe('1.234');
    });
  });
});
