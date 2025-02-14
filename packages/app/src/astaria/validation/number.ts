import { z } from 'zod';

export const NUMBER_VALIDATION = z
  .number({
    invalid_type_error: 'Enter a number',
    required_error: 'Enter a number',
  })
  .positive('Enter an amount greater than 0')
  .optional()
  .refine((value) => value !== undefined, {
    message: 'Enter a number',
  });
