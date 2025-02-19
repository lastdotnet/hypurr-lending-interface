import { IconBrandX } from '@tabler/icons-react'
import Image from 'next/image'

import maintenanceImage from '@/astaria/assets/images/maintenance.webp'
import AstariaLogo from '@/astaria/assets/logo/wordmark-black.svg?url'
import { Card } from '@/astaria/components/Card'
import { Heading } from '@/astaria/components/Heading'
import { TextLink } from '@/astaria/components/TextLink'
import { ASTARIA_STATUS, X_URL } from '@/astaria/constants/urls'

export const metadata = {
  title: 'Maintenance',
}

const MaintenancePage = () => (
  <>
    <div className="flex h-screen items-center justify-center">
      <Card className="z-10 h-[300px] w-[300px]">
        <div className="flex h-full flex-col items-center justify-center gap-5 p-4">
          <Heading className="text-center" level={3}>
            Astaria is currently under maintenance
          </Heading>
          <TextLink href={X_URL}>
            Check our <TextLink href={ASTARIA_STATUS}>status page</TextLink> and{' '}
            <IconBrandX aria-label="X" className="inline" /> for updates
          </TextLink>
          <Image alt="Astaria logo" src={AstariaLogo} />
        </div>
      </Card>
    </div>
    <Image alt="maintenance" className="z-0 object-cover" fill priority src={maintenanceImage} />
  </>
)

export default MaintenancePage
