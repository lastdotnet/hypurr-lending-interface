import Image from 'next/image'

import { useAccount } from 'wagmi'

import AssetsImage from '@/astaria/assets/images/assets.webp'
import { AddressShort } from '@/astaria/components/AddressShort'
import { EmptyStateContent, EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'

export const NoLoans = () => {
  const { address } = useAccount()

  return (
    <EmptyStateWrapper>
      <Image alt="No loans" className="w-80" priority src={AssetsImage} width={320} />
      <EmptyStateContent>
        <Heading level={2}>
          <AddressShort address={address} /> has no active loans
        </Heading>
        <p>
          Try another wallet, or <TextLink href={ROUTES.INTENTS}>transmit an intent</TextLink>.
        </p>
      </EmptyStateContent>
    </EmptyStateWrapper>
  )
}
