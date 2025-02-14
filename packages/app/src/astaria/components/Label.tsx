'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const labelVariants = cva(
  'block break-words leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    defaultVariants: {
      above: true,
    },
    variants: {
      above: {
        true: 'mb-1 font-medium',
      },
    },
  }
);

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ above = true, children, className, htmlFor, ...rest }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={clsx(labelVariants({ above, className }))}
    htmlFor={htmlFor}
    {...rest}
  >
    {children}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;
