'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import {
  type TooltipContentProps,
  type TooltipProviderProps,
} from '@radix-ui/react-tooltip';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';

import { clsx } from 'clsx';

const OPENING_DELAY = 150;
const DEFAULT_SIDE_OFFSET = 4;

const TooltipProvider = ({
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipProvider>) => (
  <TooltipPrimitive.Provider {...rest}>{children}</TooltipPrimitive.Provider>
);

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = DEFAULT_SIDE_OFFSET, ...rest }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    className={clsx(
      'z-20 max-w-sm overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-center text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    sideOffset={sideOffset}
    {...rest}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export const Tooltip = ({
  className,
  content,
  delayDuration = OPENING_DELAY,
  id,
  side,
  trigger,
  triggerAsChild,
  underline,
}: {
  className?: string;
  content: ReactNode;
  delayDuration?: TooltipProviderProps['delayDuration'];
  id?: string;
  side?: TooltipContentProps['side'];
  trigger: ReactNode;
  triggerAsChild?: boolean;
  underline?: boolean;
}) => {
  const [open, setOpen] = useState(false); // this whole component is for clicking on mobile. See https://github.com/radix-ui/primitives/issues/955#issuecomment-1798201143

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot onOpenChange={setOpen} open={open}>
        <TooltipTrigger
          asChild={triggerAsChild}
          className={clsx(className, {
            'underline decoration-dotted underline-offset-1': underline,
          })}
          id={id}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          onFocus={() => setTimeout(() => setOpen(true), 0)} // timeout needed to run this after onOpenChange to prevent bug on mobile
        >
          {trigger}
        </TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};
