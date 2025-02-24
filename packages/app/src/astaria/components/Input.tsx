import { type InputHTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

export const inputVariants = cva(
  'flex h-11 w-full rounded-sm bg-background py-2 text-primary ring-offset-background disabled:cursor-not-allowed placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none',
  {
    defaultVariants: {
      emphasis: 'medium',
      isError: false,
      textSize: 'sm',
      type: 'text',
    },
    variants: {
      emphasis: {
        low: '',
        medium: 'border border-input px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      },
      isError: {
        true: 'border-destructive',
      },
      textSize: {
        '3xl': 'text-3xl',
        sm: 'text-sm',
      },
      type: {
        email: '',
        file: 'file:border-0 file:bg-transparent file:font-bold file:text-sm',
        text: '',
      },
    },
  },
)

export type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, emphasis, isError, textSize, type, ...rest }, ref) => (
    <input
      ref={ref}
      className={clsx(inputVariants({ className, emphasis, isError, textSize, type }), className)}
      type={type}
      {...rest}
    />
  ),
)
Input.displayName = 'Input'
