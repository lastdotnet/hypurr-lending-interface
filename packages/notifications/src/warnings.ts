import { z } from 'zod'

export const warningSchema = z.object({
  code: z.string().optional(),
  description: z.string(),
  title: z.string(),
  trace: z.string().optional(),
  values: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
})
