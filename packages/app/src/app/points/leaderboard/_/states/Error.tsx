import { EmptyStateContent, EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = () => (
  <EmptyStateWrapper>
    <EmptyStateContent>
      <Heading level={3}>Could not load points leaderboard</Heading>
      <p>Try again soon</p>
    </EmptyStateContent>
  </EmptyStateWrapper>
)
