import Image from 'next/image'

import AssetsImage from '@/astaria/assets/images/assets.webp'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { EmptyStateCardWrapper, EmptyStateContent } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

export const NotConnected = () => (
  <EmptyStateCardWrapper>
    <Image alt="No loans" className="w-80" priority src={AssetsImage} width={320} />
    <EmptyStateContent className="space-y-4">
      <Heading level={2}>Your loans will appear here</Heading>
      <ConnectButton />
    </EmptyStateContent>
  </EmptyStateCardWrapper>
)
