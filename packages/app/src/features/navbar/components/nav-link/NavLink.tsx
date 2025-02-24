'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/ui/utils/style'
import { cva } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { Trans } from '@lingui/react/macro'

interface NavLinkComponentProps {
  children: React.ReactNode
  selected?: boolean
  isPlaceholder?: boolean
  className?: string
  postfix?: React.ReactNode
  Icon?: LucideIcon
}

export interface NavLinkProps extends NavLinkComponentProps {
  to: string
  locale: string
  onClick?: () => void
}

export interface NavButtonProps extends NavLinkComponentProps {
  onClick: () => void
}

export interface ExternalNavLinkProps extends NavLinkComponentProps {
  href: string
}

export interface PlaceholderNavLinkProps extends NavLinkComponentProps {}

export function NavLink({ to, children, onClick, className, locale, ...rest }: NavLinkProps) {
  const pathname = usePathname() ?? ''
  // If we have a locale, remove it from the pathname
  const pathWithoutLocale = locale ? pathname.replace(new RegExp(`^/${locale}($|/)`), '/') : pathname

  const selected = to === '/' ? pathWithoutLocale === '/' : pathWithoutLocale.startsWith(to)

  return (
    <Link href={to} onClick={onClick} className={cn(focusVariants(), className)}>
      <NavLinkComponent selected={selected} {...rest}>
        {children}
      </NavLinkComponent>
    </Link>
  )
}

export function ExternalNavLink({ href, children, className, ...rest }: ExternalNavLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(focusVariants(), className)}>
      <NavLinkComponent selected={false} {...rest}>
        {children}
      </NavLinkComponent>
    </a>
  )
}

export function NavButton({ onClick, children, className, ...rest }: NavButtonProps) {
  return (
    <button onClick={onClick} className={cn(focusVariants(), className)}>
      <NavLinkComponent selected={false} {...rest}>
        {children}
      </NavLinkComponent>
    </button>
  )
}

export function PlaceholderNavLink({ children, className, ...rest }: PlaceholderNavLinkProps) {
  return (
    <NavLinkComponent
      {...rest}
      isPlaceholder
      className={cn('cursor-default', className)}
      postfix={
        <span className="mr-0 ml-auto block rounded-[6px] border border-white/15 bg-white/5 px-2 py-1 font-normal text-[11px] text-white/50 leading-tight">
          <Trans>Soon</Trans>
        </span>
      }
    >
      {children}
    </NavLinkComponent>
  )
}

export function NavLinkComponent({
  children,
  selected,
  postfix,
  className,
  isPlaceholder,
  Icon,
}: NavLinkComponentProps) {
  return (
    <span
      className={cn(
        'flex w-full flex-row items-center gap-4 p-3 xl:p-0',
        textVariants({ selected, isPlaceholder }),
        className,
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
      {postfix}
    </span>
  )
}

export const textVariants = cva('font-medium text-lg transition-colors xl:text-sm', {
  variants: {
    selected: {
      true: 'text-white',
      false: 'text-white/50 hover:text-white',
    },
    isPlaceholder: {
      true: 'text-white/50',
    },
  },
})

export const focusVariants = cva(
  'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {},
  },
)
