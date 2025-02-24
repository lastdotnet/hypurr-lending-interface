import { EmptyStateContent, EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = () => (
  <EmptyStateWrapper>
    <EmptyStateContent>
      <Heading level={2}>Could not load points history</Heading>
      <p>Try again soon</p>
    </EmptyStateContent>
  </EmptyStateWrapper>
)
