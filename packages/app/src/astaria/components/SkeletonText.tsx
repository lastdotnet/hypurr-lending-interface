'use client';

import { type HTMLAttributes } from 'react';

import { clsx } from 'clsx';

export const SkeletonText = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx('animate-pulse bg-muted', className)} {...rest}>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {children}
  </span>
);
