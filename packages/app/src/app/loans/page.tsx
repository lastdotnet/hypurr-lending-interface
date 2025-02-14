import { MyLoans } from '@/app/loans/_/MyLoans'
import { NotConnected } from '@/app/loans/_/states/NotConnected'
import { Connected } from '@/astaria/components/Connected'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'

const PAGE_TITLE = 'My loans'
export const metadata = {
  title: PAGE_TITLE,
}

const MyLoansPage = () => (
  <Page className="space-y-4">
    <Heading className="text-center" level={1}>
      {PAGE_TITLE}
    </Heading>
    <Connected connectedComponent={<MyLoans />} notConnectedComponent={<NotConnected />} />
  </Page>
)

export default MyLoansPage
