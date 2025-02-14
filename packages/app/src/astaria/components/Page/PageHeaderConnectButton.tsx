'use client'

import { useAccount } from 'wagmi'

import { type ButtonProps } from '@/astaria/components/Button'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { Connected } from '@/astaria/components/Connected'
import { ConnectedChainLogo } from '@/astaria/components/ConnectedChainLogo'
import { UserInfo } from '@/astaria/components/UserInfo'
import { DEFAULT_CHAIN } from '@/astaria/constants/chains'
import { ENV } from '@/astaria/constants/environment'

export const PageHeaderConnectButton = ({ ...rest }: Omit<ButtonProps, 'children'>) => {
  const { address } = useAccount()

  return (
    <Connected
      connectedComponent={
        <ConnectButton {...rest} emphasis="low" rounded={false}>
          <UserInfo address={address} short />
          <ConnectedChainLogo />
        </ConnectButton>
      }
      notConnectedComponent={
        <ConnectButton
          {...rest}
          data-chainid={DEFAULT_CHAIN.id}
          data-env={ENV.NEXT_PUBLIC_VERCEL_ENV}
          emphasis="high"
          rounded={false}
        >
          Connect
        </ConnectButton>
      }
    />
  )
}
