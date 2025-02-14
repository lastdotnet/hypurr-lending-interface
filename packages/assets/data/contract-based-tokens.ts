import { foundry, sepolia } from 'viem/chains';

import { FOUNDRY_CONTRACTS, CONTRACTS } from 'contracts-internal';

export const CONTRACT_BASED_TOKENS = [
  {
    address: FOUNDRY_CONTRACTS.TestERC20,
    chainId: foundry.id,
    decimals: 18,
    logoURI: 'https://d1il7bw1n2yreo.cloudfront.net/erc20/tst20.svg',
    name: 'Test20',
    symbol: 'TST20',
  },
  {
    address: CONTRACTS.TestERC20,
    chainId: sepolia.id,
    decimals: 18,
    logoURI: 'https://d1il7bw1n2yreo.cloudfront.net/erc20/tst20.svg',
    name: 'Test20',
    symbol: 'TST20',
  },
];
