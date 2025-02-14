'use client'

import { type DialogProps } from '@radix-ui/react-dialog'
import { IconSearch } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes, forwardRef } from 'react'

import { clsx } from 'clsx'

import { Command as CommandPrimitive } from 'cmdk'

import { Dialog, DialogContent } from '@/astaria/components/Dialog'

export const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...rest }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={clsx(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className,
    )}
    {...rest}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

export const CommandDialog = ({ children, ...rest }: CommandDialogProps) => (
  <Dialog {...rest}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
)

export const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...rest }, ref) => (
  <div
    className={clsx('flex items-center rounded-md border border-input bg-background px-3', className)}
    cmdk-input-wrapper=""
  >
    <IconSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className="flex h-11 w-full py-2 text-sm text-primary outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      {...rest}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

export const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...rest }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={clsx('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...rest}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

export const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />)

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

export const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...rest }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={clsx(
      'overflow-hidden text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...rest}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

export const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...rest }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={clsx('-mx-1 h-px bg-border', className)} {...rest} />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

export const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...rest }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className,
    )}
    {...rest}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

export const CommandShortcut = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...rest} />
)
CommandShortcut.displayName = 'CommandShortcut'
