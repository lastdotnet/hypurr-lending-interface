import Image from 'next/image'

import LiquidationsImage from '@/app/_/HomePage/HowDoLiquidationsWorkSection/liquidations.webp'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'

export const HowDoLiquidationsWorkSection = () => (
  <PageSection className="grid grid-cols-1 items-center gap-10 md:grid-cols-2" dark>
    <div className="space-y-4">
      <Heading level={2}>How do liquidations work?</Heading>
      <p>
        A loan is sent to recall (liquidation) when a lender believes the loan is underwater or too risky or if lender
        wants to receive the lent capital back. In recall, Astaria automatically submits a new intent on behalf of the
        borrower. The borrower can either see what the market is willing to lend to them or simply repay their loan.
      </p>
    </div>
    <Image alt="Liquidations" className="justify-self-center" src={LiquidationsImage} width={400} />
  </PageSection>
)
