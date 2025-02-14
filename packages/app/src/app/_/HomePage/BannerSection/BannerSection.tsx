import Image from 'next/image'
import Link from 'next/link'

import RocketShip from '@/app/_/HomePage/BannerSection/rocket-ship.svg?url'
import SpaceshipOrbitingPlanet from '@/app/_/HomePage/BannerSection/spaceship-orbiting-planet.webp'
import AstariaLogo from '@/astaria/assets/logo/wordmark-white.svg?url'
import { Button } from '@/astaria/components/Button'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'
import { ROUTES } from '@/astaria/constants/routes'

export const BannerSection = () => (
  <PageSection className="relative flex items-center justify-between" dark wrapperClassName="bg-black">
    <div className="max-w-128 space-y-8">
      <Heading level={1}>
        <Image alt="Astaria" className="h-8 w-auto" quality={85} src={AstariaLogo} />
      </Heading>
      <p className="text-3xl">
        Astaria is an <strong className="italic">oracle-less, intent-based, fixed-rate lending protocol</strong>{' '}
        supporting unlimited loan durations for any asset.
      </p>
      <Button asChild>
        <Link href={ROUTES.INTENTS}>Enter app</Link>
      </Button>
      <div className="flex items-center gap-3">
        <Image alt="Rocketship icon" className="h-12 w-12" src={RocketShip} />
        <div>
          <div className="text-sm">Powered by</div>
          <div className="font-semibold text-2xl">Starport</div>
        </div>
      </div>
    </div>
    <Image alt="A spaceship orbiting a planet" className="hidden md:block" src={SpaceshipOrbitingPlanet} width={320} />
  </PageSection>
)
