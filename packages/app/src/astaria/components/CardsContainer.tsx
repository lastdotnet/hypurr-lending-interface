import { type HTMLAttributes, forwardRef } from 'react';

import { clsx } from 'clsx';

export const CardsContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className }, ref) => (
  <div
    ref={ref}
    className={clsx('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
  >
    {children}
  </div>
));
CardsContainer.displayName = 'CardsContainer';
