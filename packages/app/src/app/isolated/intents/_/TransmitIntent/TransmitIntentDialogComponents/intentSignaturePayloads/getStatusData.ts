import { encodeAbiParameters } from 'viem'

import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'

import { type ERC20 } from 'assets'
import { BaseRecallDetailsStructABI } from 'sdk/abi/BaseRecallDetailsStructABI'

export const getStatusData = (borrow: ERC20) =>
  encodeAbiParameters(
    [BaseRecallDetailsStructABI],
    [
      {
        honeymoon: TRANSMIT_INTENT_PARAMS.honeymoonPeriod,
        recallMax: TRANSMIT_INTENT_PARAMS.maximumRecall(borrow),
        recallWindow: TRANSMIT_INTENT_PARAMS.recallWindow,
      },
    ],
  )
