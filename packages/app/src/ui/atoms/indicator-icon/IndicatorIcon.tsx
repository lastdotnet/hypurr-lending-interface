import { VariantProps, cva } from 'class-variance-authority'
import { ReactNode } from 'react'

import { cn } from '@/ui/utils/style'

interface IndicatorIconProps extends VariantProps<typeof variants> {
  icon: ReactNode
  className?: string
}

export function IndicatorIcon({ icon, variant, className }: IndicatorIconProps) {
  return <div className={cn(variants({ variant }), className)}>{icon}</div>
}

const variants = cva('', {
  variants: {
    variant: {
      green: 'text-primary-bg',
      white: 'text-white',
      gray: 'text-white/20',
      orange: 'text-white/50',
      red: 'text-product-red',
    },
  },
})
