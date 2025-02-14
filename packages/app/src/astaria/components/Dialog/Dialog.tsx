import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

import { Alert, AlertDescription, AlertTitle } from '@/astaria/components/Alert'
import { ErrorMessage } from '@/astaria/components/ErrorMessage'
import { Step } from '@/astaria/components/Step'

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

export const DialogPortal = DialogPrimitive.Portal

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx(
      'fixed inset-0 z-30 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...rest}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export const dialogContainerVariants = cva(
  'fixed left-[50%] top-[50%] z-30 flex max-h-screen-cozy w-full min-w-[320px] translate-x-[-50%] translate-y-[-50%] flex-col rounded border-2 bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    defaultVariants: {
      size: 'sm',
    },
    variants: {
      size: {
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        lg: 'max-w-lg',
        md: 'max-w-md',
        sm: 'max-w-sm',
        xl: 'max-w-xl',
        xs: 'max-w-xs',
      },
    },
  },
)

const DialogClose = ({ onClose }: { onClose?: () => void }) => (
  <DialogPrimitive.Close
    className="absolute right-1 top-1 h-11 w-11 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    onClick={onClose}
  >
    <IconX className="mx-auto h-5 w-5" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
)

export const DialogContainer = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogContainerVariants> & {
      onClose?: () => void
      preventClosing?: boolean
    }
>(
  (
    {
      children,
      className,
      onClose,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      preventClosing,
      size,
      ...rest
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={clsx(dialogContainerVariants({ className, size }))}
        onEscapeKeyDown={preventClosing ? (event) => event.preventDefault() : onEscapeKeyDown}
        onInteractOutside={preventClosing ? (event) => event.preventDefault() : onInteractOutside}
        onPointerDownOutside={preventClosing ? (event) => event.preventDefault() : onPointerDownOutside}
        {...rest}
      >
        {children}
        {!preventClosing ? <DialogClose onClose={onClose} /> : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
)
DialogContainer.displayName = DialogPrimitive.Content.displayName

export const DialogHeader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex flex-col space-y-1.5 border-b p-5 pr-10 text-left', className)} {...rest} />
)
DialogHeader.displayName = 'DialogHeader'

export const dialogContentVariants = cva('space-y-2', {
  defaultVariants: {
    noPadding: false,
    scroll: true,
  },
  variants: {
    noPadding: {
      false: 'p-5',
    },
    scroll: {
      true: 'overflow-y-auto',
    },
  },
})

export type DialogStepProps = {
  isConfirming?: boolean | undefined
  isFinished?: boolean | undefined
  isLoading: boolean | undefined
  key: string
  label: ReactNode
}

export interface DialogStepsProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogContentVariants> {
  steps: DialogStepProps[]
}
export const DialogSteps = forwardRef<HTMLDivElement, DialogStepsProps>(({ className, steps, ...rest }, ref) => {
  const activeStep = steps.reduce((previousStep, currentStep) => {
    if (previousStep && previousStep.isFinished) {
      return currentStep
    }
    return previousStep
  }, steps.at(0))

  return (
    <div ref={ref} className={clsx(dialogContentVariants({ className, scroll: false }), 'border-b')} {...rest}>
      <div className="flex justify-between gap-4">
        <p>Steps</p>
        <div className="relative">
          <ul className="relative z-10 flex gap-4">
            {steps.map(({ isConfirming, isFinished, isLoading, key }, index) => (
              <li key={key}>
                <Step
                  className="shrink-0"
                  index={index}
                  isActive={key === activeStep?.key}
                  isConfirming={isConfirming}
                  isFinished={isFinished}
                  isLoading={isLoading}
                />
              </li>
            ))}
          </ul>
          <hr className="absolute top-1/2 w-full -translate-y-1/2 border-t-2" />
        </div>
      </div>
      <p className="text-sm">{activeStep?.label}</p>
    </div>
  )
})
DialogSteps.displayName = 'DialogSteps'

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {}
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, noPadding, ...rest }, ref) => (
    <div ref={ref} className={clsx(dialogContentVariants({ className, noPadding }))} {...rest}>
      {children}
    </div>
  ),
)
DialogContent.displayName = 'DialogContent'

export const DialogActions = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end', className)} {...rest} />
)
DialogActions.displayName = 'DialogActions'

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx('text-md font-semibold leading-none tracking-tight', className)}
    {...rest}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Description ref={ref} className={clsx('text-sm text-muted-foreground', className)} {...rest} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export const DialogError = forwardRef<
  ElementRef<typeof Alert>,
  ComponentPropsWithoutRef<typeof Alert> & {
    error: Error
  }
>(({ error, ...rest }, ref) => (
  <Alert ref={ref} tone="destructive" {...rest}>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription className="break-all">
      <ErrorMessage message={error.message} />
    </AlertDescription>
  </Alert>
))
DialogError.displayName = 'DialogError'

export const DialogForm = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...rest }, ref) => <form ref={ref} className={clsx('flex flex-col', className)} {...rest} />,
)
DialogForm.displayName = 'DialogForm'
