import { zeroAddress } from 'viem';

import { ETHER_DECIMALS } from 'common';
import { mainnet } from 'viem/chains';

import { type ERC20Asset } from '../types/erc20';

export const FALLBACK_ERC20_TOKEN: ERC20Asset = {
  address: zeroAddress,
  chainId: mainnet.id,
  decimals: ETHER_DECIMALS,
  logoURI: undefined,
  name: 'Unknown',
  symbol: '?',
  usdValue: undefined,
};
