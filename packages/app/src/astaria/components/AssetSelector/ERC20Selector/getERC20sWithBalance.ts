import { type Address } from 'viem'

import { type ChainId } from 'chains'

import { executeHelper } from '@/astaria/onchain-helpers/executeHelper'
import {
  TokenBalancesHelperABI,
  TokenBalancesHelperBytecode,
} from '@/astaria/onchain-helpers/fragments/TokenBalancesHelper'

import { type ERC20, ERC20Schema } from 'assets'

export const getERC20sWithBalance = async ({
  chainId,
  includeNativeBalance,
  tokenAddresses,
  userAddress,
}: {
  chainId: ChainId
  includeNativeBalance?: boolean
  tokenAddresses: Address[]
  userAddress: Address
}) => {
  const tokens = await executeHelper({
    abi: TokenBalancesHelperABI,
    args: [tokenAddresses, userAddress],
    bytecode: TokenBalancesHelperBytecode,
    chainId,
    functionName: 'readBalances',
  })

  return tokens.slice(includeNativeBalance ? 0 : 1).map((token) => {
    const tokenData: ERC20 = {
      address: token.token,
      amount: token.balance,
      chainId,
      decimals: token.decimals,
      name: token.name,
      symbol: token.symbol,
    }
    return ERC20Schema.parse(tokenData)
  })
}
