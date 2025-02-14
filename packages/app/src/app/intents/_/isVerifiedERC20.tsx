import { isAddressEqual } from 'viem';

import { type ERC20, type ERC20Asset, erc20Tokens } from 'assets';

export const isVerifiedERC20 = ({ erc20 }: { erc20: ERC20 | ERC20Asset }) =>
  erc20Tokens.some(({ address }) => isAddressEqual(address, erc20.address));
