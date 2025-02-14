import { IconSettings } from '@tabler/icons-react'
import Link from 'next/link'

import { NotificationDashboard } from '@/app/wallet-notifications/dashboard/_/NotificationDashboard'
import { Heading } from '@/astaria/components/Heading'
import { Label } from '@/astaria/components/Label'
import { Page } from '@/astaria/components/Page'
import { ROUTES } from '@/astaria/constants/routes'

const PAGE_TITLE = 'Notifications'
export const metadata = {
  title: PAGE_TITLE,
}

const NotificationsDashboardPage = async () => (
  <Page>
    <div className="space-y-4 lg:mx-auto lg:w-1/3">
      <Label above={false} className="flex items-center justify-between">
        <Heading level={1}>{PAGE_TITLE}</Heading>
        <Link href={ROUTES.WALLET_NOTIFICATIONS_SETTINGS}>
          <IconSettings />
        </Link>
      </Label>
      <NotificationDashboard />
    </div>
  </Page>
)

export default NotificationsDashboardPage
