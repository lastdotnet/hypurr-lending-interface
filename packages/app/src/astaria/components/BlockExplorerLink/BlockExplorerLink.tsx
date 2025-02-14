'use client'

import { type ReactNode } from 'react'

import { useBlockExplorer } from '@/astaria/components/BlockExplorerLink/useBlockExplorer'
import { TextLink, type TextLinkProps } from '@/astaria/components/TextLink'

export const BlockExplorerLink = ({
  children,
  className,
  type = 'transaction',
  value,
  ...rest
}: Omit<TextLinkProps, 'children' | 'href'> & {
  children?: ReactNode
  type: 'transaction' | 'address'
  value?: string
}) => {
  const blockExplorer = useBlockExplorer()

  if (value === undefined || blockExplorer === 'no-block-explorer') {
    return null
  }

  const path = type === 'transaction' ? 'tx' : 'address'
  const href = `${blockExplorer?.url}/${path}/${value}`

  if (children) {
    return (
      <TextLink {...rest} className={className} href={href}>
        {children}
      </TextLink>
    )
  }

  return (
    <TextLink {...rest} className={className} href={href}>
      View {type} on {blockExplorer?.name}
    </TextLink>
  )
}
