import { z } from 'zod'

import { formatNumber } from 'common'

import { INTENTS_APY_MAXIMUM } from '@/astaria/constants/constants'

const APY_MAX_MESSAGE = `Enter ${formatNumber({ amount: INTENTS_APY_MAXIMUM })}% or less`

export const APY_VALIDATION = z
  .number({
    invalid_type_error: 'Enter an apy',
    required_error: 'Enter an apy',
  })
  .positive('Enter an apy greater than 0')
  .refine((apy) => apy !== undefined, {
    message: 'Enter an apy',
  })
  .refine((apy) => apy && apy <= INTENTS_APY_MAXIMUM, {
    message: APY_MAX_MESSAGE,
  })
