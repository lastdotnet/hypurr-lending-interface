import React from 'react'
import { Link, useMatch } from 'react-router-dom'

import { cn } from '@/ui/utils/style'
import { VariantProps, cva } from 'class-variance-authority'

export interface NavLinkProps extends NavLinkComponentProps {
  to: string
  onClick?: () => void
  className?: string
  withIndicator?: boolean
}

export interface ExternalNavLinkProps extends NavLinkComponentProps {
  href: string
  className?: string
  withIndicator?: boolean
}

export interface PlaceholderNavLinkProps extends NavLinkComponentProps {
  className?: string
  withIndicator?: boolean
}

export function NavLink({ to, children, onClick, className, ...rest }: NavLinkProps) {
  const selected = !!useMatch(`${to}/*`)

  return (
    <Link
      onClick={onClick}
      to={to}
      data-testid={`navlink-${to}-${selected ? 'selected' : 'not-selected'}`}
      className={cn(
        'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <NavLinkComponent selected={selected} {...rest}>
        {children}
      </NavLinkComponent>
    </Link>
  )
}

export function ExternalNavLink({ href, children, className, ...rest }: ExternalNavLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <NavLinkComponent selected={false} {...rest}>
        {children}
      </NavLinkComponent>
    </a>
  )
}
export function PlaceholderNavLink({ children, className, ...rest }: NavLinkComponentProps) {
  return (
    <span
      className={cn(
        'cursor-default rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <NavLinkComponent
        {...rest}
        isPlaceholder
        withIndicator={true}
        postfix={
          <span className="ml-1 block self-start rounded border border-white/15 bg-white/5 px-2 py-1 text-white/50 text-xs">
            Soon
          </span>
        }
      >
        {children}
      </NavLinkComponent>
    </span>
  )
}

interface NavLinkComponentProps {
  children: React.ReactNode
  selected?: boolean
  postfix?: React.ReactNode
  variant?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md'
  shady?: boolean
  isPlaceholder?: boolean
  className?: string
  withIndicator?: boolean
}
export function NavLinkComponent({
  children,
  selected,
  postfix,
  variant = 'horizontal',
  size = 'md',
  shady,
  className,
  withIndicator = false,
  isPlaceholder,
}: NavLinkComponentProps) {
  return (
    <NavLinkBox>
      <NavLinkBox.Content
        shady={shady}
        selected={selected}
        isPlaceholder={isPlaceholder}
        postfix={postfix}
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </NavLinkBox.Content>
      {withIndicator && <NavLinkBox.Indicator selected={selected} variant={variant} />}
    </NavLinkBox>
  )
}

export function NavLinkBox({ children, className, ...rest }: React.HTMLProps<HTMLDivElement>) {
  return (
    <span className={cn('relative isolate flex h-full flex-row justify-between xl:flex-col', className)} {...rest}>
      {children}
    </span>
  )
}

const pseudoElementVariants = cva('-z-10 absolute bottom-0 left-0 hidden xl:block', {
  variants: {
    variant: {
      horizontal: 'h-1.5 rounded-t-lg',
      vertical: 'h-full w-1.5 rounded-r-lg',
    },
    selected: {
      true: 'bg-nav-primary',
    },
  },
})

export function NavLinkIndicator({
  variant = 'horizontal',
  selected,
  className,
  ...rest
}: VariantProps<typeof pseudoElementVariants> & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        pseudoElementVariants({
          variant,
          selected,
        }),
      )}
      {...rest}
    />
  )
}

const contentVariants = cva('flex h-full flex-row items-center gap-1 text-primary', {
  variants: {
    variant: {
      horizontal: 'xl:justify-center',
      vertical: 'p-4',
    },
    size: {
      sm: 'text-base xl:text-sm',
      md: 'text-xl xl:text-base',
    },
  },
})

const textVariants = cva('flex h-full flex-row items-center', {
  variants: {
    selected: {
      true: 'text-white',
      false: 'text-white/50 hover:text-white',
    },
    shady: {
      true: 'first:opacity-50 hover:first:opacity-100',
    },
    isPlaceholder: {
      true: 'text-white/50',
    },
  },
})

export function NavLinkContent({
  className,
  variant = 'horizontal',
  shady,
  selected,
  isPlaceholder,
  size = 'md',
  children,
  postfix,
  ...rest
}: Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
  isPlaceholder?: boolean
  postfix?: React.ReactNode
} & VariantProps<typeof contentVariants> &
  VariantProps<typeof textVariants>) {
  return (
    <span
      className={cn(
        contentVariants({
          size,
          variant,
        }),
        className,
      )}
      {...rest}
    >
      <span
        className={textVariants({
          shady: shady && !selected,
          selected,
          isPlaceholder,
        })}
      >
        {children}
      </span>
      {postfix}
    </span>
  )
}

NavLinkBox.Indicator = NavLinkIndicator
NavLinkBox.Content = NavLinkContent
