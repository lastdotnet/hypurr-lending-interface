import { z } from 'zod';

import { ChainIdSchema } from 'chains';
import { AddressSchema } from 'common';

export const GETOriginationTransactionParametersSchema = z.object({
  address: AddressSchema,
  caveatId: z.string(),
  chainId: ChainIdSchema,
});
export type GETOriginationTransactionParameters = z.infer<
  typeof GETOriginationTransactionParametersSchema
>;
