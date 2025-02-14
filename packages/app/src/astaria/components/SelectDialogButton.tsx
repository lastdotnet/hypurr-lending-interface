'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { forwardRef } from 'react'

import { clsx } from 'clsx'

import { Button, type ButtonProps } from '@/astaria/components/Button'

export const SelectDialogButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => (
    <Button ref={ref} className={clsx('group max-w-32', className)} emphasis="medium" size="md-narrow" {...rest}>
      {children}
      <IconChevronDown
        aria-hidden="true"
        className="shrink-0 transition duration-200 group-data-[state=open]:rotate-180"
      />
    </Button>
  ),
)
SelectDialogButton.displayName = 'SelectDialogButton'
