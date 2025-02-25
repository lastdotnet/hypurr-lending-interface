import { IconSettings } from '@tabler/icons-react'
import Link from 'next/link'

import { NotificationDashboard } from '@/app/wallet-notifications/dashboard/_/NotificationDashboard'
import { Label } from '@/astaria/components/Label'
import { ROUTES } from '@/astaria/constants/routes'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { Typography } from '@/ui/atoms/typography/Typography'

const PAGE_TITLE = 'Notifications'
export const metadata = {
  title: PAGE_TITLE,
}

const NotificationsDashboardPage = async () => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <div className="space-y-4 lg:mx-auto lg:w-1/3">
      <Label above={false} className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Typography variant="h2" gradient>
            {PAGE_TITLE}
          </Typography>
        </div>
        <Link href={ROUTES.WALLET_NOTIFICATIONS_SETTINGS}>
          <IconSettings />
        </Link>
      </Label>
      <NotificationDashboard />
    </div>
  </PageLayout>
)

export default NotificationsDashboardPage
