'use client';

import { type HTMLAttributes } from 'react';

import { clsx } from 'clsx';

export const SkeletonIcon = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('h-6 w-6 animate-pulse rounded-full bg-muted', className)}
    {...rest}
  />
);
