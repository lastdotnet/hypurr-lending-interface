import { NotificationToggle } from '@/app/wallet-notifications/settings/_/NotificationToggle'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'

const PAGE_TITLE = 'Notification settings'
export const metadata = {
  title: PAGE_TITLE,
}

const NotificationsSettingsPage = async () => (
  <Page className="space-y-4">
    <Heading className="text-center" level={1}>
      {PAGE_TITLE}
    </Heading>
    <NotificationToggle />
  </Page>
)

export default NotificationsSettingsPage
