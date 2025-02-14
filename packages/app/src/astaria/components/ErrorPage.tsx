import { type ReactElement, type ReactNode } from 'react'

import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page/Page'
import { PageContent } from '@/astaria/components/Page/PageContent'
import { TextLink } from '@/astaria/components/TextLink'
import { ASTARIA_STATUS } from '@/astaria/constants/urls'

interface ErrorPage {
  actions?: ReactElement
  message: ReactNode
  title: ReactNode
}

export const ErrorPageWrapper = ({ children }: { children: ReactNode }) => (
  <Page>
    <PageContent className="mx-auto max-w-xl space-y-4 text-center">{children}</PageContent>
  </Page>
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
