import { type ERC20WithChainIdAndStartPointsTimestamp } from '../types'
import erc20tokensJson from './erc20Tokens.json'

export const erc20Tokens = erc20tokensJson.tokens as ERC20WithChainIdAndStartPointsTimestamp[]
