import { z } from 'zod';

import { ChainIdSchema } from 'chains';
import { AddressSchema } from 'common';

import { SignedCaveatSchema } from 'sdk';

export const InsertSignedCaveatParametersSchema = z.object({
  chainId: ChainIdSchema,
  owner: AddressSchema,
  signedCaveat: SignedCaveatSchema,
});
export type InsertSignedCaveatParameters = z.infer<
  typeof InsertSignedCaveatParametersSchema
>;
