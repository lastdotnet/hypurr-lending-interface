import Image from 'next/image'

import WhatAreIntentsImage from '@/app/_/HomePage/WhatAreIntentsSection/what-are-intents.webp'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'
import { TextLink } from '@/astaria/components/TextLink'

export const WhatAreIntentsSection = () => (
  <PageSection className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
    <div className="space-y-4">
      <Heading level={2}>What are intents?</Heading>
      <p>
        Intents are signed messages that enable users to outline their desired outcomes, permitting third parties to
        manage transaction creation and execution, while users maintain overall control.
      </p>
      <p>
        <TextLink href="https://docs.astaria.xyz/user-guides/borrowing">More info</TextLink>
      </p>
    </div>
    <Image alt="What are intents" className="justify-self-center" src={WhatAreIntentsImage} width={550} />
  </PageSection>
)
