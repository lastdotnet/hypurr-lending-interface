import { type FunctionComponent, type ReactElement, type ReactNode } from 'react'

import { Heading } from '@/astaria/components/Heading'

interface ErrorPage {
  actions?: ReactElement
  message: ReactNode
  title: ReactNode
}

export const ErrorSection: FunctionComponent<ErrorPage> = ({ actions, message, title }) => (
  <div className="space-y-4 text-center">
    <Heading level={2}>{title}</Heading>

    <div>{message}</div>

    {actions}
  </div>
)
