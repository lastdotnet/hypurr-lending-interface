import { type Address, isAddressEqual } from 'viem';

import { type ChainId } from 'chains';

import { getERC20TokensByChainId } from 'assets';

export const isUSDTAddress = ({
  address,
  chainId,
}: {
  address: Address;
  chainId: ChainId;
}) => {
  const usdtTokens = getERC20TokensByChainId(chainId).filter(
    (token) => token.symbol === 'USDT'
  );

  return usdtTokens.some((token) => isAddressEqual(token.address, address));
};
