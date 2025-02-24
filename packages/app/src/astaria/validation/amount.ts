import { z } from 'zod'

export const AMOUNT_VALIDATION = z
  .bigint({
    invalid_type_error: 'Enter an amount',
    required_error: 'Enter an amount',
  })
  .positive('Enter an amount greater than 0')
  .refine((value) => value !== undefined, {
    message: 'Enter an amount',
  })
