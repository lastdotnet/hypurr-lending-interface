import { isAddress, isAddressEqual } from 'viem'

import { type ERC20Asset, type IntentAsset } from 'assets'

export const isSelectingExternalERC20 = ({
  asset,
  erc20s,
  query,
}: {
  asset: IntentAsset
  erc20s: ERC20Asset[] | undefined
  query: string | undefined
}) => {
  if (!erc20s) {
    return false
  }

  if (query && isAddress(query)) {
    return !erc20s.some((token) => isAddressEqual(token.address, query))
  }

  return !erc20s.some((token) => isAddressEqual(token.address, asset.address))
}
