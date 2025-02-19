import type { HTMLAttributes } from 'react'

import { Points } from '@/astaria/components/Points'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

interface UserPointsProps extends HTMLAttributes<HTMLSpanElement> {
  short?: boolean
}

export const UserPoints = ({ short, ...rest }: UserPointsProps) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  return <Points address={address} short={short} {...rest} />
}
