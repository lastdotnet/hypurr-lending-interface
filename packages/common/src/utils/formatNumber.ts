import { DEFAULT_LOCALE, JS_MAX_SAFE_SIGNIFICANT_DIGITS } from '../constants';

/**
 * This helper makes sure that we always show decimal places instead of scientific notation.
 * This is important for viem `parseEther` and `parseUnits` functions as well as readability.
 */
export const formatNumber = ({
  amount,
  maxDecimals,
  notation,
  signDisplay,
  standardDecimals,
  useDashForZero = false,
  useGrouping = true,
}: {
  amount: bigint | number;
  maxDecimals?: number;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | undefined;
  standardDecimals?: boolean;
  useDashForZero?: boolean;
  useGrouping?: boolean;
}) => {
  if (amount === 0 && useDashForZero) {
    return '—';
  }

  return Intl.NumberFormat(DEFAULT_LOCALE, {
    maximumFractionDigits: maxDecimals,
    maximumSignificantDigits:
      maxDecimals !== undefined && maxDecimals < JS_MAX_SAFE_SIGNIFICANT_DIGITS
        ? undefined
        : JS_MAX_SAFE_SIGNIFICANT_DIGITS,
    minimumFractionDigits: standardDecimals ? maxDecimals : undefined,
    notation,
    signDisplay,
    useGrouping,
  }).format(amount);
};
