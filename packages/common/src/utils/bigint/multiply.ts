import { ETHER_DECIMALS } from '../../constants';
import { removeDecimals } from './addOrRemoveDecimals';

export const multiply = ({
  a,
  b,
  decimals = ETHER_DECIMALS,
}: {
  a: bigint;
  b: bigint;
  decimals?: number;
}) => removeDecimals({ decimals, value: a * b });
