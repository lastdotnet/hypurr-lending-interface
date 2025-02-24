import { type HTMLAttributes, forwardRef } from 'react'

import { clsx } from 'clsx'

export const FetchNextPagePoint = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div className={clsx('relative', className)}>
      <div ref={ref} className="-top-96 absolute" {...rest} />
    </div>
  ),
)
FetchNextPagePoint.displayName = 'FetchNextPagePoint'
