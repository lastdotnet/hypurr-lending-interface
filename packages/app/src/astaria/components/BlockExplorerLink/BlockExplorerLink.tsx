'use client'

import { type ReactNode } from 'react'

import { TextLink, type TextLinkProps } from '@/astaria/components/TextLink'
import { useOriginChainId } from '@/domain/hooks/useOriginChainId'
import { useChainId, useChains } from 'wagmi'

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
  const originChainId = useOriginChainId()
  const chains = useChains()
  const _chainId = useChainId()

  const chainId = _chainId ?? originChainId
  const chain = chains.find((chain) => chain.id === chainId)
  const blockExplorer = chain?.blockExplorers?.default

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
