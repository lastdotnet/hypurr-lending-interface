import Image from 'next/image'

import { clsx } from 'clsx'

import { FadeCover } from '@/app/_/HomePage/FadeCover'
import { MockIntent } from '@/app/_/HomePage/MockIntent'
import { getMockIntents } from '@/app/_/HomePage/ScanningTheSkiesSection/getMockIntents'
import Satellite from '@/astaria/assets/images/satellite.webp'
import { PageSection } from '@/astaria/components/Page/PageSection'

import { type Asset, type ERC20 } from 'assets'

const MockIntentsRow = ({
  className,
  intents,
}: {
  className?: string
  intents: {
    asking: ERC20
    collateral: Asset
    id: string
  }[]
}) => (
  <div className={clsx('flex items-center justify-center gap-6', className)}>
    {intents.map(({ asking, collateral, id }) => (
      <MockIntent key={id} asking={asking} collateral={collateral} />
    ))}
  </div>
)

const speeds = [
  'animate-zoom-past-lr-24',
  'animate-zoom-past-lr-26',
  'animate-zoom-past-lr-28',
  'animate-zoom-past-lr-30',
  'animate-zoom-past-lr-32',
  'animate-zoom-past-lr-34',
  'animate-zoom-past-lr-36',
  'animate-zoom-past-lr-38',
  'animate-zoom-past-lr-40',
  'animate-zoom-past-lr-42',
  'animate-zoom-past-lr-44',
  'animate-zoom-past-lr-46',
  'animate-zoom-past-lr-48',
  'animate-zoom-past-lr-50',
]
const getRandomSpeed = () => speeds[Math.floor(Math.random() * speeds.length)]

export const ScanningTheSkiesSection = () => {
  const numberOfRows = 5
  const intentsPerRow = 15
  const mockIntents = getMockIntents({ amount: numberOfRows * intentsPerRow })

  return (
    <PageSection dark>
      <div className="space-y-8">
        <p className="text-center font-medium text-2xl italic">Scanning the night sky for intents…</p>
        <div className="-ml-8 -mr-8 relative overflow-x-hidden">
          <FadeCover className="top-0 bottom-0 left-0 w-8 bg-gradient-to-r" />
          <div className="space-y-6">
            {[...Array(numberOfRows).keys()].map((index) => {
              const startPoint = index * intentsPerRow
              const endPoint = startPoint + Math.floor(mockIntents.length / numberOfRows)
              const intents = mockIntents.slice(startPoint, endPoint)

              return <MockIntentsRow key={`intent-row-${index}`} className={getRandomSpeed()} intents={intents} />
            })}
          </div>
          <FadeCover className="top-0 right-0 bottom-0 w-8 bg-gradient-to-l" />
        </div>
      </div>
      <div className="-mt-96 flex justify-center">
        <Image alt="Satelite" className="relative z-30" src={Satellite} width={363} />
      </div>
    </PageSection>
  )
}
