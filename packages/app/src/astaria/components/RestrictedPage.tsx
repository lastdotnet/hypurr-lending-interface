import { type Address } from 'viem'

import { AddressShort } from '@/astaria/components/AddressShort'
import { BlockExplorerLink } from '@/astaria/components/BlockExplorerLink'
import { ErrorPage } from '@/astaria/components/ErrorPage'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'

export const RestrictedPage = ({ address }: { address: Address }) => (
  <ErrorPage
    message={
      <>
        <p>
          Your wallet address has been found to be owned by or affiliated with an individual or entity on{' '}
          <TextLink href="https://home.treasury.gov/policy-issues/financial-sanctions/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists">
            OFAC&apos;s SDN List
          </TextLink>
          .
        </p>

        <div>
          <BlockExplorerLink
            className="font-mono text-destructive [overflow-wrap:anywhere]"
            type="address"
            value={address}
          >
            <AddressShort address={address} />
          </BlockExplorerLink>
        </div>

        <p className="text-sm text-muted-foreground">
          Use of this site is restricted pursuant to our <TextLink href={ROUTES.TERMS}>Terms of Use</TextLink>.
        </p>
      </>
    }
    title="Restricted address"
  />
)
