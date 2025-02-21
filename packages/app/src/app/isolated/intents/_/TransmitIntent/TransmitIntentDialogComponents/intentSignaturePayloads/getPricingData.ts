import { encodeAbiParameters } from 'viem'

import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'

import { type ERC20 } from 'assets'
import { BasePricingDetailsStructABI } from 'sdk/abi/BasePricingDetailsStructABI'

export const getPricingData = ({
  apy,
  borrow,
}: {
  apy: bigint
  borrow: ERC20
}) =>
  encodeAbiParameters(
    [BasePricingDetailsStructABI],
    [
      {
        carryRate: TRANSMIT_INTENT_PARAMS.carryRate(borrow),
        decimals: BigInt(borrow.decimals),
        rate: apy,
      },
    ],
  )
