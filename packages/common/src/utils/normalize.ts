import { formatUnits } from 'viem';

import { ETHER_DECIMALS, JS_MAX_SAFE_SIGNIFICANT_DIGITS } from '../constants';

const removeDigits = ({
  digits,
  string,
}: {
  digits: number;
  string: string;
}) => {
  // prevent bad rounding
  if (string.replace('.', '').length > digits) {
    const decimalPointLength = string.includes('.') ? 1 : 0;
    const digitsToKeep = digits + decimalPointLength;
    return string.slice(0, digitsToKeep);
  }
  return string;
};

const removeUnsafeDigits = (string: string) =>
  removeDigits({ digits: JS_MAX_SAFE_SIGNIFICANT_DIGITS, string });

export const toNormalizedValue = (
  value = 0n,
  decimals = ETHER_DECIMALS
): number => {
  const formatted = formatUnits(value, decimals);

  return Number(removeUnsafeDigits(formatted));
};

export const toNormalizedString = (value = 0n, decimals = ETHER_DECIMALS) =>
  formatUnits(value, decimals);
