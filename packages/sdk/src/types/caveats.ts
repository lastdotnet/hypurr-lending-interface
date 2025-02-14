import { z } from 'zod';

import {
  AddressSchema,
  HexSchema,
  Uint256NonZeroSchema,
  Uint256Schema,
} from 'common';

export const CaveatSchema = z.object({
  data: HexSchema,
  enforcer: AddressSchema,
});
export type Caveat = z.infer<typeof CaveatSchema>;

export const UnsignedCaveatSchema = z.object({
  caveats: CaveatSchema.array(),
  deadline: Uint256NonZeroSchema,
  nonce: Uint256Schema,
  salt: HexSchema,
  singleUse: z.boolean(),
});

export const SignedCaveatSchema = UnsignedCaveatSchema.extend({
  signature: HexSchema,
});
export type SignedCaveat = z.infer<typeof SignedCaveatSchema>;
