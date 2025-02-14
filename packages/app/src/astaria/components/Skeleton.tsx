import { type HTMLAttributes } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const skeletonVariants = cva('animate-pulse bg-muted', {
  defaultVariants: {
    rounded: false,
  },
  variants: {
    rounded: {
      false: '',
      full: 'rounded-full',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
  },
});

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}
export const Skeleton = ({ className, rounded, ...rest }: SkeletonProps) => (
  <div
    className={clsx(
      skeletonVariants({
        className,
        rounded,
      })
    )}
    {...rest}
  />
);
