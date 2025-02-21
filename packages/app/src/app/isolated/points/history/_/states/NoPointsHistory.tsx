import Image from 'next/image'

import IconStarDashed from '@/astaria/assets/images/dashed-star.svg?url'
import { EmptyStateCardWrapper, EmptyStateContent } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

export const NoPointsHistory = () => (
  <EmptyStateCardWrapper>
    <Image alt="No points history" priority src={IconStarDashed} width={100} />
    <EmptyStateContent>
      <Heading level={2}>You haven&apos;t earned any points yet</Heading>
    </EmptyStateContent>
  </EmptyStateCardWrapper>
)
