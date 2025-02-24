import { z } from 'zod'

const ADDRESS_LENGTH = 42
export const AddressSchema = z
  .string()
  .startsWith('0x', { message: 'Enter an address that starts with 0x' })
  .length(ADDRESS_LENGTH, {
    message: `Enter an address with ${ADDRESS_LENGTH} characters`,
  })
  .toLowerCase()
  .trim()
  .transform((val) => val as `0x${string}`)
