'use client'

import { type HTMLAttributes } from 'react'

import { clsx } from 'clsx'

export const SkeletonSwitch = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('h-6 w-11 animate-pulse rounded-full bg-muted px-0.5', className)} {...rest} />
)
