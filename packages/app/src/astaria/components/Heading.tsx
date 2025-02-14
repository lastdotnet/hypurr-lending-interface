import { type HTMLAttributes, type JSX } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const headerVariants = cva('text-balance font-bold text-primary', {
  defaultVariants: {
    level: 1,
  },
  variants: {
    level: {
      1: 'text-2xl',
      2: 'text-xl',
      3: 'text-lg',
      4: 'text-base',
      5: 'text-sm',
      6: 'text-xs',
    },
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const Heading = ({
  children,
  className,
  component,
  level,
}: HeadingProps) => {
  const HeadingTag = component ?? (`h${level}` as keyof JSX.IntrinsicElements);

  return (
    <HeadingTag className={clsx(headerVariants({ className, level }))}>
      {children}
    </HeadingTag>
  );
};
