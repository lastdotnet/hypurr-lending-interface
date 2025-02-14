import { z } from 'zod'

import { INTENTS_LTV_MAX } from '@/astaria/constants/constants'

export const LTV_VALIDATION = (ltvMax = INTENTS_LTV_MAX) =>
  z
    .number({
      invalid_type_error: 'Enter amounts above',
      required_error: 'Enter amounts above',
    })
    .refine((value) => value === 0 || (value && value <= ltvMax), {
      // Allow intents without values (NFTs or unknown assets) to transmit
      message: `Enter amounts so the LTV is ${ltvMax} or less`,
    })
    .nullable()
