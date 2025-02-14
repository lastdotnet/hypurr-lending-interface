'use client'

import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'
import { type Column } from '@tanstack/react-table'
import { type ReactNode } from 'react'

import { clsx } from 'clsx'

import { Button, type ButtonProps } from '@/astaria/components/Button'

export const SortButton = ({
  children,
  className,
  column,
  ...rest
}: ButtonProps & {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>
}) => (
  <Button
    className={clsx('text-left', className)}
    emphasis="low"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    size="md-narrow"
    {...rest}
  >
    {children}
    {column.getIsSorted() === 'asc' ? (
      <IconArrowDown className="h-4 w-4 shrink-0" />
    ) : (
      <IconArrowUp className="h-4 w-4 shrink-0" />
    )}
  </Button>
)
