import { type ReactNode } from 'react'

import { clsx } from 'clsx'

import { Card, CardSection } from '@/astaria/components/Card'

export const EmptyStateWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-64 flex-col flex-wrap items-center justify-center gap-8">{children}</div>
)

export const EmptyStateCardWrapper = ({
  children,
}: {
  children: ReactNode
}) => (
  <Card>
    <CardSection className="flex min-h-64 flex-col flex-wrap items-center justify-center gap-8">{children}</CardSection>
  </Card>
)

export const EmptyStateContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={clsx('max-w-sm text-center', className)}>{children}</div>
