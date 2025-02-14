import { type ReactNode } from 'react'

import { Button } from '@/astaria/components/Button'
import { Card, CardSection } from '@/astaria/components/Card'

export const FeedNoMatch = ({ children }: { children: ReactNode }) => (
  <Card>
    <CardSection className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <span>No loan offer that matches your parameters?</span>
      <Button
        className="lg:-my-5 lg:-mr-2"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ behavior: 'smooth', top: 0 })
          }
        }}
      >
        {children}
      </Button>
    </CardSection>
  </Card>
)
