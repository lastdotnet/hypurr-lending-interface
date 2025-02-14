import { QuickInfo } from '@/app/vault/_/QuickInfo'
import { Vault } from '@/app/vault/_/Vault'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'

const PAGE_TITLE = 'Vault'
export const metadata = {
  title: PAGE_TITLE,
}

const VaultPage = () => (
  <Page className="space-y-4">
    <Heading className="text-center" level={1}>
      {PAGE_TITLE}
    </Heading>
    <QuickInfo />
    <Vault />
  </Page>
)

export default VaultPage
