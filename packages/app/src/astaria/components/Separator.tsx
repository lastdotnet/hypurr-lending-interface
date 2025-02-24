'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

export const separatorVariants = cva('shrink-0', {
  compoundVariants: [
    {
      class: 'border-t-2',
      dashed: true,
      orientation: 'horizontal',
    },
    {
      class: 'border-l-2',
      dashed: true,
      orientation: 'vertical',
    },
    {
      class: 'h-[1px]',
      dashed: false,
      orientation: 'horizontal',
    },
    {
      class: 'w-[1px]',
      dashed: false,
      orientation: 'vertical',
    },
  ],
  defaultVariants: {
    dashed: false,
    orientation: 'horizontal',
  },
  variants: {
    dashed: {
      false: 'bg-border',
      true: 'border-dashed',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
})

export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & VariantProps<typeof separatorVariants>
>(({ className, dashed, decorative = true, orientation, ...rest }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    className={clsx(separatorVariants({ className, dashed, orientation }))}
    decorative={decorative}
    orientation={orientation}
    {...rest}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName
