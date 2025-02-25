import { assert } from '@/utils/assert'

import { Opaque } from './types'

/**
 * Represents a token symbol. ie. DAI
 */
export type TokenSymbol = Opaque<string, 'TokenSymbol'>
export function TokenSymbol(symbol: string): TokenSymbol {
  assert(symbol.length > 0, 'Token symbol should have at least 1 character.')
  return symbol as TokenSymbol
}
