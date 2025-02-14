import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

import { clsx } from 'clsx'

import { Button, type ButtonProps } from '@/astaria/components/Button'

export const NavButton = ({
  children,
  className,
  href,
  isInMobileNavigation,
  setIsOpen,
  ...rest
}: ButtonProps & {
  href: string
  isInMobileNavigationBar?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const getEmphasis = () => {
    if (isInMobileNavigation) {
      return 'medium'
    }
    return 'low'
  }

  return (
    <Button
      asChild
      className={clsx({}, className)}
      emphasis={getEmphasis()}
      isInMobileNavigation={isInMobileNavigation}
      onClick={isInMobileNavigation && setIsOpen ? () => setIsOpen(false) : undefined}
      rounded={false}
      {...rest}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}
