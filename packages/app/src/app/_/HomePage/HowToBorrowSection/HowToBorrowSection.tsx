import Image from 'next/image'
import Link from 'next/link'

import HowToBorrowImage from '@/app/_/HomePage/HowToBorrowSection/how-to-borrow.webp'
import { Button } from '@/astaria/components/Button'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'
import { ROUTES } from '@/astaria/constants/routes'

export const HowToBorrowSection = () => (
  <PageSection className="grid grid-cols-1 items-center gap-10 md:grid-cols-2" dark>
    <div className="space-y-4">
      <Heading level={2}>How to borrow?</Heading>
      <p>
        Sign gas-free messages specifying your desired loan terms. You can request loans using any asset as collateral
        (ERC-20s or NFTs) and borrow any ERC-20. Most people choose to borrow stablecoins or WETH.
      </p>
      <Button>
        <Link href={ROUTES.INTENTS}>Transmit a borrow intent</Link>
      </Button>
    </div>
    <Image alt="How to borrow" className="justify-self-center" src={HowToBorrowImage} width={400} />
  </PageSection>
)
