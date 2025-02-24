import { cn } from '@/ui/utils/style'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

export type LinkProps = NextLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    external?: boolean
  }

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, className, external, ...props }, ref) => {
  if (external) {
    return (
      <a
        href={href || ''}
        className={cn('cursor-pointer text-secondary hover:text-primary', className)}
        target="_blank"
        rel="noreferrer"
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
        }}
        {...props}
      />
    )
  }

  return <NextLink href={href} className={cn('text-secondary hover:text-primary', className)} ref={ref} {...props} />
})

Link.displayName = 'Link'

export { Link }
