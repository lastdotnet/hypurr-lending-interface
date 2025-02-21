import Image from 'next/image'

import AssetsImage from '@/astaria/assets/images/assets.webp'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { EmptyStateContent, EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

export const NotConnected = () => (
  <EmptyStateWrapper>
    <Image alt="No loans" className="w-80" priority src={AssetsImage} width={320} />
    <EmptyStateContent className="space-y-4">
      <Heading level={2}>Your loans will appear here</Heading>
      <ConnectButton />
    </EmptyStateContent>
  </EmptyStateWrapper>
)
