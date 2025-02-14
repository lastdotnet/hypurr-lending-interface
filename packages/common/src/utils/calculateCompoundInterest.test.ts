import { describe, expect, it } from 'vitest';

import { ETHER_DECIMALS } from '../constants/constants';
import { addDecimals, removeDecimals } from './bigint';
import { calculateCompoundInterest } from './calculateCompoundInterest';
import { getSecondsBigInt } from './date-time';

describe('calculateCompoundInterest', () => {
  /**
   * This tests the frontend `calculateCompoundInterest` to be roughly equal to the solidity implementation.
   * @see https://github.com/AstariaXYZ/v1-core/blob/e7461290751eabf78bae4c75f6d3389d58795da8/test/TestCompoundInterest.sol#L70-L89
   */
  it('should calculate the current compound interest for a loan', () => {
    for (let decimals = 1; decimals <= ETHER_DECIMALS; decimals += 1) {
      const interest = removeDecimals({
        decimals: ETHER_DECIMALS - decimals,
        value: 1_718_281_828_459_045_235n,
      });
      const amount = addDecimals({ decimals, value: 1n });
      const apy = addDecimals({ decimals, value: 1n });
      const delta = getSecondsBigInt({ days: 365 });

      const result = calculateCompoundInterest({
        amount,
        apy,
        decimals,
        delta,
      });

      expect(result).toBe(interest);
    }
  });
});
