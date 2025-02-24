import { type Address } from 'viem'

import { ERC20_LOOKUP } from '../constants/erc20Lookup'
import { type ERC20Asset } from '../types/erc20'

export const getERC20TokenByAddress = ({
  address,
}: {
  address: Address
}): ERC20Asset | undefined => {
  const token = ERC20_LOOKUP[address]
  if (token) {
    return token
  }

  return undefined
}
