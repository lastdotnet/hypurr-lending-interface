import { bigintToPercent, numberToBigInt } from 'common';

import type { ERC20Asset } from 'assets';

export const convertAPYFieldToBigInt = ({
  apyField,
  borrowAsset,
}: {
  apyField: number | undefined;
  borrowAsset: ERC20Asset;
}) => {
  if (!apyField) {
    return 0n;
  }
  return bigintToPercent(
    numberToBigInt({
      amount: apyField,
      decimals: borrowAsset.decimals,
    })
  );
};
