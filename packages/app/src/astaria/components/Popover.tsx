'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const DEFAULT_SIDE_OFFSET = 4;

const popoverContentVariants = cva(
  'z-40 w-72 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    defaultVariants: {
      noPadding: false,
    },
    variants: {
      noPadding: {
        false: 'p-4',
      },
    },
  }
);

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverContentVariants> & {
      isInPortal?: boolean;
    }
>(
  (
    {
      align = 'center',
      className,
      isInPortal = true,
      noPadding,
      sideOffset = DEFAULT_SIDE_OFFSET,
      ...rest
    },
    ref
  ) => {
    const popoverContent = (
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        className={clsx(popoverContentVariants({ className, noPadding }))}
        sideOffset={sideOffset}
        {...rest}
      />
    );

    if (isInPortal) {
      return (
        <PopoverPrimitive.Portal>{popoverContent}</PopoverPrimitive.Portal>
      );
    }
    return popoverContent;
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
