import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import { Heading, type HeadingProps } from '@/astaria/components/Heading'

export interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  endButton?: ReactNode
  level?: HeadingProps['level']
  link?: ReactNode
  setting?: ReactNode
}
export const PageTitle = forwardRef<HTMLDivElement, PageTitleProps>(
  ({ children, className, level = 1, link, setting, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx('flex min-h-[42px] flex-wrap justify-between gap-2 border-b-2', className)}
      {...rest}
    >
      <Heading className="px-3 py-2 text-base sm:px-4 md:px-5" level={level}>
        {children}
      </Heading>
      {link || setting ? (
        <div className="flex flex-wrap items-center gap-2">
          {link ? <div className="px-3 py-2 sm:px-4 md:px-5">{link}</div> : null}
          {setting ? <div className="px-3 py-2 sm:px-4 md:px-5">{setting}</div> : null}
        </div>
      ) : null}
    </div>
  ),
)
PageTitle.displayName = 'PageTitle'
