import { type ReactElement, type ReactNode } from 'react'

import { Heading } from '@/astaria/components/Heading'
import { PageContent } from '@/astaria/components/Page/PageContent'
import { TextLink } from '@/astaria/components/TextLink'
import { ASTARIA_STATUS } from '@/astaria/constants/urls'
import { PageLayout } from '@/ui/layouts/PageLayout'

interface ErrorPage {
  actions?: ReactElement
  message: ReactNode
  title: ReactNode
}

export const ErrorPageWrapper = ({ children }: { children: ReactNode }) => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <PageContent className="mx-auto max-w-xl space-y-4 text-center">{children}</PageContent>
  </PageLayout>
)

export const ErrorPage = ({ actions, message, title }: ErrorPage) => (
  <ErrorPageWrapper>
    <Heading level={1}>{title}</Heading>

    <div>{message}</div>

    <div>
      <TextLink href={ASTARIA_STATUS}>Astaria status</TextLink>
    </div>

    {actions}
  </ErrorPageWrapper>
)
