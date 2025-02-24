import Link from 'next/link'

import { FadeCover } from '@/app/_/HomePage/FadeCover'
import { MockIntent } from '@/app/_/HomePage/MockIntent'
import { getMockIntents } from '@/app/_/HomePage/ScanningTheSkiesSection/getMockIntents'
import { Button } from '@/astaria/components/Button'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'
import { ROUTES } from '@/astaria/constants/routes'

export const HowToLendSection = () => {
  const numberOfMockIntents = 40
  const mockIntents = getMockIntents({ amount: numberOfMockIntents })

  return (
    <PageSection className="grid grid-cols-1 items-center gap-10 md:grid-cols-2" dark>
      <div className="relative h-96 overflow-hidden">
        <FadeCover className="top-0 right-0 left-0 h-8 bg-gradient-to-b" />
        <div className="flex animate-zoom-past-tb-medium flex-col items-start gap-6">
          {mockIntents.map((intent) => (
            <MockIntent key={intent.id} asking={intent.asking} collateral={intent.collateral} />
          ))}
        </div>
        <FadeCover className="right-0 bottom-0 left-0 h-8 bg-gradient-to-t" />
      </div>
      <div className="space-y-4">
        <Heading level={2}>How to lend?</Heading>
        <p>
          Lenders monitor the intent feed, either through the UI or by accessing the Astaria API. They can
          permissionlessly fill any intent that meets their risk parameters. Lenders can also create lend intents to be
          matched with prospective borrowers.
        </p>
        <Button>
          <Link href={ROUTES.INTENTS}>Browse the intent feed</Link>
        </Button>
      </div>
    </PageSection>
  )
}
