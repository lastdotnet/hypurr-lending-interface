import { type HTMLAttributes, forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

export const pageContentVariants = cva('min-h-72 w-full md:w-auto', {
  defaultVariants: {
    noPadding: false,
  },
  variants: {
    noPadding: {
      false: 'p-3 sm:p-4 md:p-5',
    },
  },
});

export interface PageContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContentVariants> {}
export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  ({ children, className, noPadding, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(pageContentVariants({ className, noPadding }))}
      {...rest}
    >
      {children}
    </div>
  )
);
PageContent.displayName = 'PageContent';
