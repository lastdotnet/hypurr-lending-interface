import { SUPPORTED_CHAIN_IDS } from '@/config/chain/constants'
import { assert } from '@/utils/assert'
import { NumberLike, bigNumberify } from '@/utils/bigNumber'
import { Opaque } from './types'

/**
 * Represent id of a chain supported by the app
 */
export type SupportedChainId = Opaque<number, 'SupportedChainId'>
export function SupportedChainId(value: NumberLike): SupportedChainId {
  const result = bigNumberify(value)
  assert(!result.dp(), 'Chain id should not have decimal points in its representation.')
  assert(result.isPositive(), 'Chain id value should be a positive number.')

  const chainId = result.toNumber()
  const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId as (typeof SUPPORTED_CHAIN_IDS)[number])
  assert(isSupported, 'Chain id is not supported.')

  return chainId as SupportedChainId
}
