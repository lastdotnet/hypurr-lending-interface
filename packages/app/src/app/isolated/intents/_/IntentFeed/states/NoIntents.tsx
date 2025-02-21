import Image from 'next/image'

import Satellite from '@/astaria/assets/images/satellite.webp'
import { EmptyStateCardWrapper, EmptyStateContent } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

export const NoIntents = () => (
  <EmptyStateCardWrapper>
    <Image alt="No intents" src={Satellite} width={210} />
    <EmptyStateContent>
      <Heading level={2}>The skies are quiet tonight</Heading>
      <p>When someone transmits an intent, it will appear here.</p>
    </EmptyStateContent>
  </EmptyStateCardWrapper>
)
