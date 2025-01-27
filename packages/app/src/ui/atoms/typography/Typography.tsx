import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/ui/utils/style'

export type BaseElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'font-bold text-4xl leading-none lg:text-5.5xl',
      h2: 'font-bold text-4xl leading-none',
      h3: 'font-bold text-2xl leading-none',
      h4: 'font-normal text-base leading-none',
      p: 'font-normal text-base',
      span: 'font-normal text-base',
      prompt: 'text-prompt-foreground text-xs leading-none tracking-tight',
    },
    gradient: {
      true: 'inline-block bg-gradient-to-r from-gradient-yellow to-gradient-green bg-clip-text text-transparent',
      false: null,
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  element?: BaseElement
  gradient?: boolean
}

function variantToElement(variant: VariantProps<typeof typographyVariants>['variant']): BaseElement {
  if (variant === 'prompt') return 'span'
  return variant ?? 'p'
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ element, variant, gradient, className, ...props }, ref) => {
    const Element = element ?? variantToElement(variant)

    return <Element className={cn(typographyVariants({ variant, gradient, className }))} ref={ref as any} {...props} />
  },
)
Typography.displayName = 'Typography'

export { Typography, type TypographyProps }
