import { type HTMLAttributes, forwardRef } from 'react';

import { clsx } from 'clsx';

export const CardBanner = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...rest }, ref) => (
  <div ref={ref} className={clsx('rounded-sm p-4', className)} {...rest}>
    {children}
  </div>
));
CardBanner.displayName = 'CardBanner';
