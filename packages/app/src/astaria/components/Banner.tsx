import { type HTMLAttributes, forwardRef } from 'react';

import { clsx } from 'clsx';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {}
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'dark h-9 w-full overflow-hidden whitespace-nowrap bg-background p-2 text-center text-sm text-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);
Banner.displayName = 'Banner';
