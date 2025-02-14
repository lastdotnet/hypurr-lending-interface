import { type ComponentType } from 'react'

import { useAccount } from 'wagmi'

import { NotConnectedDialog } from '@/astaria/components/NetworkErrors/NotConnectedDialog'
import { UnsupportedChainDialog } from '@/astaria/components/NetworkErrors/UnsupportedChainDialog'
import { useChainId } from '@/astaria/hooks/useChainId'
import { isSupportedChain } from '@/astaria/utils/isSupportedChain'

export const withChainCheckDialog =
  <P extends object>(Component: ComponentType<P>) =>
  // eslint-disable-next-line react/display-name
  (props: P) => {
    const { isConnected } = useAccount()
    const chainId = useChainId()

    if (!isConnected) {
      return <NotConnectedDialog />
    }

    if (!chainId || !isSupportedChain(chainId)) {
      return <UnsupportedChainDialog />
    }
    return <Component {...props} />
  }
