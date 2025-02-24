'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

export const Sheet = SheetPrimitive.Root

export const SheetTrigger = SheetPrimitive.Trigger

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    mobileNav: boolean | null | undefined
  }
>(({ className, mobileNav, ...rest }, ref) => (
  <SheetPrimitive.Overlay
    className={clsx(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in',
      { 'top-13': mobileNav },
      className,
    )}
    {...rest}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in focus:outline-none data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    defaultVariants: {
      mobileNav: false,
      side: 'left',
    },
    variants: {
      mobileNav: {
        false: 'pt-10',
        true: 'top-13',
      },
      side: {
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
      },
    },
  },
)

type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>

export const SheetContent = forwardRef<ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ children, className, mobileNav, side = 'right', ...rest }, ref) => (
    <SheetPortal>
      <SheetOverlay mobileNav={mobileNav} />
      <SheetPrimitive.Content ref={ref} className={clsx(sheetVariants({ className, mobileNav, side }))} {...rest}>
        {children}
        {mobileNav ? null : (
          <SheetPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <IconX className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
)
SheetContent.displayName = SheetPrimitive.Content.displayName

export const SheetHeader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex flex-col space-y-2 text-center sm:text-left', className)} {...rest} />
)
SheetHeader.displayName = 'SheetHeader'

export const SheetFooter = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...rest} />
)
SheetFooter.displayName = 'SheetFooter'

export const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...rest }, ref) => (
  <SheetPrimitive.Title ref={ref} className={clsx('font-semibold text-foreground text-lg', className)} {...rest} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

export const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...rest }, ref) => (
  <SheetPrimitive.Description ref={ref} className={clsx('text-muted-foreground text-sm', className)} {...rest} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName
