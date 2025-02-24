import { type ReactNode } from 'react'

import { clsx } from 'clsx'

export const CurrencyAmountWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={clsx('flex shrink-0 flex-wrap items-center gap-1', className)}>{children}</div>
