import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/ui/utils/style'
import { Link, LinkProps } from '../link/Link'
import { Ref } from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xs border border-slate-700 border-opacity-10 font-semibold text-base ring-offset-background transition-colors disabled:pointer-events-none disabled:bg-slate-700 disabled:bg-opacity-10 disabled:text-white/70 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-bg text-primary-foreground hover:bg-primary-hover hover:text-body',
        secondary: 'bg-primary-bg text-primary-foreground hover:bg-primary-hover hover:text-body',
        text: 'border-none text-secondary disabled:bg-transparent',
        icon: 'border-none',
        green: 'bg-sec-green text-basics-white hover:bg-green-700',
        floating:
          'flex items-center justify-center gap-2 rounded-sm border border-white/4 bg-[#0F0F12] px-5 py-3 font-normal text-white text-xs shadow-md transition-colors hover:bg-[#1A1A1D] hover:text-white',
      },
      rounded: {
        full: 'rounded-full',
        undefined: '',
      },
      size: {
        sm: 'h-8 gap-1 px-3 py-2 text-xs',
        md: 'h-10 gap-1.5 px-4 py-2',
        lg: 'h-14 gap-2.5 px-6 py-4',
        undefined: '',
      },
      spaceAround: {
        none: 'h-auto p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  prefixIcon?: React.ReactNode
  postfixIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      spaceAround,
      asChild = false,
      type = 'button',
      prefixIcon,
      postfixIcon,
      rounded,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        {...props}
        className={cn(buttonVariants({ variant, size, spaceAround, rounded }), className)}
        ref={ref}
        type={type}
      >
        <>
          {prefixIcon}
          {props.children}
          {postfixIcon}
        </>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export type LinkButtonProps = VariantProps<typeof buttonVariants> &
  LinkProps & {
    disabled?: boolean
    prefixIcon?: React.ReactNode
    postfixIcon?: React.ReactNode
    ref: Ref<HTMLAnchorElement>
  }

export function LinkButton({
  className,
  variant,
  rounded,
  size,
  spaceAround,
  disabled,
  prefixIcon,
  postfixIcon,
  ref,
  ...props
}: LinkButtonProps) {
  return (
    <>
      {disabled ? (
        <Button disabled className={cn(buttonVariants({ variant, rounded, size, spaceAround, className }))}>
          {prefixIcon}
          {props.children}
          {postfixIcon}
        </Button>
      ) : (
        <Link className={cn(buttonVariants({ variant, rounded, size, spaceAround, className }))} ref={ref} {...props}>
          {prefixIcon}
          {props.children}
          {postfixIcon}
        </Link>
      )}
    </>
  )
}
