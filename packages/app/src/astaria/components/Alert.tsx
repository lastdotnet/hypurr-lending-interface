import { type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  {
    defaultVariants: {
      tone: 'default',
    },
    variants: {
      tone: {
        default: 'bg-background text-foreground [&>svg]:text-foreground',
        destructive: 'border-destructive text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning: 'border-warning text-warning dark:border-warning [&>svg]:text-warning',
      },
    },
  },
)

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}
export const Alert = forwardRef<HTMLDivElement, AlertProps>(({ className, tone, ...rest }, ref) => (
  <div ref={ref} className={clsx(alertVariants({ className, tone }))} role="alert" {...rest} />
))
Alert.displayName = 'Alert'

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(({ children, className, ...rest }, ref) => (
  <h5 ref={ref} className={clsx('mb-1 font-medium leading-none tracking-tight', className)} {...rest}>
    {children}
  </h5>
))
AlertTitle.displayName = 'AlertTitle'

export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {}
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx('text-sm [&_p]:leading-relaxed', className)} {...rest} />
))
AlertDescription.displayName = 'AlertDescription'
