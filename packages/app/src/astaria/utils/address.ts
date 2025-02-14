import { type Address } from 'viem';

export const addressesAreEqual = (
  address1: Address | undefined,
  address2: Address | undefined
) => {
  if (!address1 || !address2) {
    return false;
  }

  return address1.toLowerCase() === address2.toLowerCase();
};
