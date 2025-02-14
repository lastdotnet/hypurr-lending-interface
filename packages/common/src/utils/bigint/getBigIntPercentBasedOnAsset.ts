import { addDecimals } from './addOrRemoveDecimals';
import { bigintToPercent } from './bigintToPercent';

export const getBigIntPercentBasedOnDecimals = ({
  decimals,
  percent, // 1000% = 1000n
}: {
  decimals: number;
  percent: bigint;
}) => bigintToPercent(addDecimals({ decimals, value: percent }));
