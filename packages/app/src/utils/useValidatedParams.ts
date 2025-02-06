'use client'

import { useParams } from 'next/navigation'
import { z } from 'zod'

import { NotFoundError } from '@/domain/errors/not-found'

export function useValidatedParams<T extends z.ZodTypeAny>(schema: T): z.output<T> {
  const params = useParams()
  const result = schema.safeParse(params)

  if (!result.success) {
    throw new NotFoundError()
  }

  return result.data
}
