'use client';

import { type HTMLAttributes } from 'react';

import { clsx } from 'clsx';

export const SkeletonImage = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('animate-pulse bg-muted', className)} {...rest} />
);
