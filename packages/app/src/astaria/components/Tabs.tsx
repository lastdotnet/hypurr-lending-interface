'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { clsx } from 'clsx';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsx(
      'grid w-full grid-cols-2 items-center justify-center gap-1 rounded-md border-2 bg-muted p-1 text-muted-foreground',
      className
    )}
    {...rest}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;
export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={clsx(
      'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...rest}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={clsx('focus-visible:outline-none', className)}
    {...rest}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
