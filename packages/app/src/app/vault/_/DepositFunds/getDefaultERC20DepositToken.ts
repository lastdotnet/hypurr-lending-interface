import { type ChainId } from 'chains'

import { DEFAULT_CHAIN } from '@/astaria/constants/chains'

import { getERC20TokenBySymbol } from 'assets'

export const getDefaultERC20DepositToken = ({
  chainId = DEFAULT_CHAIN.id,
}: {
  chainId?: ChainId
}) =>
  getERC20TokenBySymbol({
    chainId,
    symbol: 'USDC',
  })
