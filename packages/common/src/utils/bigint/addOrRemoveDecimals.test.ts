import { describe, expect, it } from 'vitest';

import { addDecimals, addOrRemoveDecimals } from './addOrRemoveDecimals';

describe('addOrRemoveDecimals', () => {
  it('should convert 1 USDC to 1 WETH', () => {
    expect(
      addOrRemoveDecimals({
        newDecimals: 18,
        oldDecimals: 6,
        value: addDecimals({ decimals: 6, value: 1n }),
      })
    ).toBe(addDecimals({ decimals: 18, value: 1n }));
  });
});
