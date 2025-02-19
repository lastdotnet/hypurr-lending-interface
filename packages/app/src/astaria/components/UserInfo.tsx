import { type Address, isAddressEqual } from 'viem'
import { normalize } from 'viem/ens'
import { useEnsAvatar, useEnsName } from 'wagmi'

import { clsx } from 'clsx'

import Avatar from 'boring-avatars'

import { SkeletonText } from '@/astaria/components/SkeletonText'
import { shorten } from '@/astaria/utils/shorten'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const UserInfo = ({
  address,
  className,
  markConnectedAddress,
  short,
  skeleton,
}: {
  address?: Address | undefined
  className?: string
  markConnectedAddress?: boolean
  short?: boolean
  skeleton?: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const connectedAddress = wallet?.address as Address | undefined

  const isConnectedAddress = address && connectedAddress && isAddressEqual(address, connectedAddress)

  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  })
  const { data: ensAvatar } = useEnsAvatar({
    chainId: 1,
    name: ensName ? normalize(ensName) : undefined,
  })

  const fallbackAvatar = (
    <Avatar colors={['#000000', '#b0b0b0', '#393939', '#cdcdcd', '#707070']} name={address} size={16} variant="beam" />
  )

  if (skeleton) {
    return (
      <div className={clsx('flex items-center gap-1', className)}>
        {fallbackAvatar}
        <SkeletonText />
      </div>
    )
  }

  const avatar = ensAvatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={ensName ?? ''} className="h-4 w-4 rounded-full" src={ensAvatar} />
  ) : (
    fallbackAvatar
  )

  const name = ensName ? shorten({ value: ensName }) : shorten({ value: address })

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {avatar}
      {short ? (
        <>
          <span className="hidden text-nowrap md:block">{name}</span>
          <span className="text-nowrap md:hidden">
            {ensName
              ? shorten({ maxLength: 4, value: ensName, veryShort: 'start' })
              : shorten({ value: address, veryShort: 'end' })}
          </span>
        </>
      ) : (
        name
      )}
      {markConnectedAddress && isConnectedAddress ? <span>(You)</span> : null}
    </div>
  )
}
