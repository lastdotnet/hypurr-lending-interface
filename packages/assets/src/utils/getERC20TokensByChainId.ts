import { type ChainId } from 'chains'

import { erc20Tokens } from '../constants/erc20Tokens'

export const getERC20TokensByChainId = (chainId: ChainId) => erc20Tokens.filter((token) => token.chainId === chainId)
