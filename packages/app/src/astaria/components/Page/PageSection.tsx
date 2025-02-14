import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const pageSectionVariants = cva('w-full', {
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    size: {
      medium: 'max-w-screen-xl',
      narrow: 'max-w-sm',
      paper: 'max-w-4xl',
      wide: '',
    },
  },
});

export interface PageSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageSectionVariants> {
  dark?: boolean;
  wrapperClassName?: string;
}
export const PageSection = forwardRef<HTMLDivElement, PageSectionProps>(
  ({ children, className, dark, size, wrapperClassName, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'flex justify-center p-4 sm:p-8 md:p-14 lg:p-20',
        wrapperClassName,
        {
          'dark bg-background text-foreground': dark,
        }
      )}
      {...rest}
    >
      <div
        className={clsx(
          pageSectionVariants({
            size,
          }),
          className
        )}
      >
        {children}
      </div>
    </div>
  )
);
PageSection.displayName = 'PageSection';

export interface PageSectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  onTheRight?: ReactNode;
}
export const PageSectionTitle = forwardRef<
  HTMLDivElement,
  PageSectionTitleProps
>(({ children, className, onTheRight, ...rest }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'flex items-center justify-between rounded-sm border bg-white p-4',
      className
    )}
    {...rest}
  >
    {children}
    {onTheRight}
  </div>
));
PageSectionTitle.displayName = 'PageSectionTitle';
