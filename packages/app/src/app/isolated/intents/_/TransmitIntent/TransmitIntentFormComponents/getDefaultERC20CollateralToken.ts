import { foundry, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import { DEFAULT_CHAIN } from '@/astaria/constants/chains'

import { getERC20TokenBySymbol } from 'assets'

export const getDefaultERC20CollateralToken = ({
  chainId = DEFAULT_CHAIN.id,
}: {
  chainId?: ChainId
}) => {
  if (chainId === foundry.id || chainId === sepolia.id) {
    return getERC20TokenBySymbol({
      chainId: sepolia.id,
      symbol: 'USDC',
    })
  }

  return getERC20TokenBySymbol({
    chainId,
    symbol: 'WETH',
  })
}
