'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { IconCheck } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    isError?: boolean
    label?: ReactNode
  }
>(({ className, isError, label, ...rest }, ref) => (
  <label className={clsx('flex items-center gap-4', className)}>
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        'peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        { 'border-destructive': isError, 'border-primary': !isError },
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className={clsx('flex items-center justify-center text-current')}>
        <IconCheck className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label}
  </label>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName
