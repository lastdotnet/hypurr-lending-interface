import { getNowInSecondsBigInt } from 'common'

import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'

export const getDeadline = () => getNowInSecondsBigInt() + TRANSMIT_INTENT_PARAMS.defaultDeadline

export const getEndTime = () => getNowInSecondsBigInt() + TRANSMIT_INTENT_PARAMS.defaultEndTime
