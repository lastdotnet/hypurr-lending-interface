import { forwardRef } from 'react'

import { clsx } from 'clsx'

import { Card, type CardProps } from '@/astaria/components/Card'

export type AssetCardProps = CardProps

export const AssetCard = forwardRef<HTMLDivElement, AssetCardProps>(({ children, className, ...rest }, ref) => (
  <Card ref={ref} className={clsx(className)} {...rest}>
    {children}
  </Card>
))

AssetCard.displayName = 'AssetCard'
