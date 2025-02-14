import { type HTMLAttributes, forwardRef } from 'react';

import { clsx } from 'clsx';

export const FetchNextPagePoint = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div className={clsx('relative', className)}>
    <div ref={ref} className="absolute -top-96" {...rest} />
  </div>
));
FetchNextPagePoint.displayName = 'FetchNextPagePoint';
