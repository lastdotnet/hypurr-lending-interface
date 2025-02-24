import { z } from 'zod'

import { pow } from '../utils/bigint'

const getMax = (exponent: bigint) => pow({ base: 2n, exponent }) - 1n

/* eslint-disable no-magic-numbers */
export const UINT256MAX = getMax(256n)
/* eslint-enable no-magic-numbers */

export const Uint256Schema = z
  .union([z.string(), z.number().int(), z.bigint()])
  .transform((val) => BigInt(val))
  .refine((val) => val >= 0, 'Must be a positive integer')
  .refine((val) => val <= UINT256MAX, 'Cannot exceed (2^256) - 1')

export const Uint256NonZeroSchema = Uint256Schema.refine((val) => val > 0, 'Must be a non-zero positive integer')
