import type { HTMLAttributes } from 'react'

import { useAccount } from 'wagmi'

import { Points } from '@/astaria/components/Points'

interface UserPointsProps extends HTMLAttributes<HTMLSpanElement> {
  short?: boolean
}

export const UserPoints = ({ short, ...rest }: UserPointsProps) => {
  const { address } = useAccount()

  return <Points address={address} short={short} {...rest} />
}
