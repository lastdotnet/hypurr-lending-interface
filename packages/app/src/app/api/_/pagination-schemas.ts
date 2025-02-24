import { z } from 'zod'

export const DEFAULT_LIMIT = 10

export const PaginatedResponseSchema = z.object({
  paging: z.object({
    itemsReturned: z.number(),
    limit: z.number(),
    offset: z.number(),
    onLastPage: z.boolean(),
    total: z.number(),
  }),
})

export const PaginationParametersSchema = z.object({
  limit: z.coerce.number().optional().default(DEFAULT_LIMIT),
  offset: z.coerce.number().optional().default(0),
})

export type PaginationParameters = z.infer<typeof PaginationParametersSchema>
