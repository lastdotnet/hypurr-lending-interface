'use client'

import { type ReactNode } from 'react'

import { useSwitchChain } from 'wagmi'

import { type ChainId } from 'chains'

import { Button, type ButtonProps } from '@/astaria/components/Button'
import { ChainLogo } from '@/astaria/components/ChainLogo'
import { getChain } from '@/astaria/utils/getChain'

type SwitchChainButtonProps = Omit<ButtonProps, 'children'> & {
  chainId: ChainId
  children?: ReactNode
}

export const SwitchChainButton = ({ chainId, children, ...rest }: SwitchChainButtonProps) => {
  const { switchChain } = useSwitchChain()
  const chain = getChain({ chainId })

  return (
    <Button {...rest} onClick={() => switchChain({ chainId })}>
      {children ?? (
        <>
          Switch to {chain.name}
          <ChainLogo chainId={chainId} height="32" width="32" />
        </>
      )}
    </Button>
  )
}
