import { EmptyStateContent, EmptyStateWrapper } from '@/astaria/components/EmptyState'
import { Heading } from '@/astaria/components/Heading'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = ({ shortId }: { shortId: string }) => (
  <EmptyStateWrapper>
    <EmptyStateContent>
      <Heading className="break-all" level={2}>
        {shortId} does not exist
      </Heading>
      <p>Try another id.</p>
    </EmptyStateContent>
  </EmptyStateWrapper>
)
