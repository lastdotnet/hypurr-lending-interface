import { MyLoans } from '@/app/isolated/loans/_/MyLoans'
import { NotConnected } from '@/app/isolated/loans/_/states/NotConnected'
import { Connected } from '@/astaria/components/Connected'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

const PAGE_TITLE = 'My loans'
export const metadata = {
  title: PAGE_TITLE,
}

const MyLoansPage = () => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <div className="flex flex-row items-center gap-4">
      <Typography variant="h2" gradient>
        {PAGE_TITLE}
      </Typography>
    </div>
    <Connected connectedComponent={<MyLoans />} notConnectedComponent={<NotConnected />} />
  </PageLayout>
)

export default MyLoansPage
