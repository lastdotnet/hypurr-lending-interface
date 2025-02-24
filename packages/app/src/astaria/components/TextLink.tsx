import { IconExternalLink } from '@tabler/icons-react'
import Link from 'next/link'
import { type MouseEventHandler, type ReactNode } from 'react'

import { clsx } from 'clsx'

export type TextLinkProps = {
  children: ReactNode
  className?: string
  href: string
  onClick?: MouseEventHandler<void> | undefined
  showIcon?: boolean
}

export const TextLink = ({
  children,
  className,
  href,
  onClick = undefined,
  showIcon = true,
  ...rest
}: TextLinkProps) => {
  if (href.startsWith('http')) {
    return (
      <a
        className={clsx('text-primary underline', className)}
        href={href as string}
        rel="noopener noreferrer"
        target="_blank"
        {...rest}
      >
        {children}
        {showIcon ? <IconExternalLink size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> : null}
      </a>
    )
  }
  return (
    <Link className={clsx('text-primary underline', className)} href={href} {...rest}>
      {children}
    </Link>
  )
}
