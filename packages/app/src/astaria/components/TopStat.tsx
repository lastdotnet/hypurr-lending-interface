import { type ReactNode } from 'react'

import { CardSection } from '@/astaria/components/Card'

export const TopStat = ({
  label,
  value,
}: {
  label: ReactNode
  value?: ReactNode
}) => (
  <CardSection className="w-full">
    <div className="font-medium">{label}</div>
    <div className="text-2xl font-medium">{value}</div>
  </CardSection>
)
