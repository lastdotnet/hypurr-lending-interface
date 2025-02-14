'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { IconCheck, IconChevronRight, IconCircle } from '@tabler/icons-react';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef,
} from 'react';

import { clsx } from 'clsx';

export const ContextMenu = ContextMenuPrimitive.Root;

export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

export const ContextMenuGroup = ContextMenuPrimitive.Group;

export const ContextMenuPortal = ContextMenuPrimitive.Portal;

export const ContextMenuSub = ContextMenuPrimitive.Sub;

export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuSubTrigger = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ children, className, inset, ...rest }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={clsx(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className
    )}
    {...rest}
  >
    {children}
    <IconChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

export const ContextMenuSubContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...rest }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={clsx(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...rest}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

export const ContextMenuContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...rest }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={clsx(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...rest}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

export const ContextMenuItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...rest }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...rest}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

export const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ checked, children, className, ...rest }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className
    )}
    {...rest}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <IconCheck className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

export const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ children, className, ...rest }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className
    )}
    {...rest}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <IconCircle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

export const ContextMenuLabel = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...rest }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={clsx(
      'px-2 py-1.5 text-sm font-semibold text-foreground',
      inset && 'pl-8',
      className
    )}
    {...rest}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

export const ContextMenuSeparator = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...rest }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={clsx('-mx-1 my-1 h-px bg-border', className)}
    {...rest}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

export const ContextMenuShortcut = ({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={clsx(
      'ml-auto text-xs tracking-widest text-muted-foreground',
      className
    )}
    {...rest}
  />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';
