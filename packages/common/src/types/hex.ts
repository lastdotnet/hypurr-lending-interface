import { z } from 'zod';

export const HexSchema = z.custom<`0x${string}`>(
  (val) => typeof val === 'string' && /^0x[a-fA-F0-9]*$/.test(val)
);
