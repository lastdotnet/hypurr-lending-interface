import { z } from 'zod';

import { base, foundry, mainnet, mode, sepolia } from 'viem/chains';

export const ChainIdSchema = z.union([
  z.literal(base.id),
  z.literal(foundry.id),
  z.literal(mainnet.id),
  z.literal(mode.id),
  z.literal(sepolia.id),
]);
export type ChainId = z.infer<typeof ChainIdSchema>;
