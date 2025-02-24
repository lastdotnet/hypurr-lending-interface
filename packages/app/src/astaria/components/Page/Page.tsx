import { type HTMLAttributes, forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { clsx } from 'clsx'

const mainVariants = cva('flex flex-grow flex-col items-center bg-grid-pattern', {
  defaultVariants: {
    padding: true,
  },
  variants: {
    padding: {
      true: 'p-2 2xl:p-12 lg:p-8 md:p-6 sm:p-4 xl:p-10',
    },
  },
})

const pageVariants = cva('w-full', {
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
})

export interface PageProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mainVariants>,
    VariantProps<typeof pageVariants> {}
export const Page = forwardRef<HTMLDivElement, PageProps>(({ children, className, padding, size, ...rest }, ref) => (
  <main
    className={clsx(
      mainVariants({
        padding,
      }),
    )}
  >
    <div
      ref={ref}
      className={clsx(
        pageVariants({
          size,
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  </main>
))
Page.displayName = 'Page'
