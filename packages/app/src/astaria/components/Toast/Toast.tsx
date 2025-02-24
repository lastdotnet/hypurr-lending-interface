'use client'

import * as ToastPrimitives from '@radix-ui/react-toast'
import { IconX } from '@tabler/icons-react'
import { type ComponentPropsWithoutRef, type ElementRef, type ReactElement, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

export const ToastProvider = ToastPrimitives.Provider

export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...rest }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(
      'fixed top-0 z-40 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:right-0 sm:bottom-0 md:max-w-[420px] sm:flex-col',
      className,
    )}
    {...rest}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

export const toastVariants = cva(
  'group data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border bg-background p-4 pr-9 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[swipe=end]:animate-out data-[swipe=move]:transition-none',
  {
    defaultVariants: {
      tone: 'default',
    },
    variants: {
      tone: {
        default: '',
        destructive: 'border-destructive',
      },
    },
  },
)

export const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, tone, ...rest }, ref) => (
  <ToastPrimitives.Root ref={ref} className={clsx(toastVariants({ className, tone }))} {...rest} />
))
Toast.displayName = ToastPrimitives.Root.displayName

export const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...rest }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={clsx(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 font-medium text-sm ring-offset-background transition-colors disabled:pointer-events-none group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive hover:bg-secondary group-[.destructive]:hover:text-destructive disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring group-[.destructive]:focus:ring-destructive focus:ring-offset-2',
      className,
    )}
    {...rest}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

export const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...rest }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={clsx(
      '-right-0.5 -top-0.5 absolute flex h-11 w-11 items-center justify-center rounded-md p-1 text-foreground group-[.destructive]:hover:text-red-50 group-[.destructive]:text-red-300 hover:text-foreground focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=""
    {...rest}
  >
    <IconX className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...rest }, ref) => (
  <ToastPrimitives.Title ref={ref} className={clsx('font-semibold text-sm', className)} {...rest} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...rest }, ref) => (
  <ToastPrimitives.Description ref={ref} className={clsx('text-sm opacity-90', className)} {...rest} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>

export type ToastActionElement = ReactElement<typeof ToastAction>
