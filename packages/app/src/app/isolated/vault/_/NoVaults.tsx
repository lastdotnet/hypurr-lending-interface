import Image from 'next/image'

import { DepositFunds } from '@/app/isolated/vault/_/DepositFunds/DepositFunds'
import VaultIcon from '@/astaria/assets/images/vault.svg'
import { Card, CardSection } from '@/astaria/components/Card'
import { Heading } from '@/astaria/components/Heading'

export const NoVaults = () => (
  <Card>
    <CardSection className="flex flex-col items-center justify-center gap-8 md:p-10">
      <Heading level={2}>You haven’t deposited to Astaria’s managed vault yet.</Heading>
      <Image alt="vault image" priority src={VaultIcon} />
      <p className="max-w-xl text-center">
        A vault allows you to deposit assets which can be used to lend on your behalf by Astaria. You can withdraw funds
        at any time, pending availability based on any outstanding loans using vault funds.
      </p>
      <DepositFunds />
    </CardSection>
  </Card>
)
