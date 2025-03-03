import { NotificationToggle } from '@/app/wallet-notifications/settings/_/NotificationToggle'
import { PageLayout } from '@/ui/layouts/PageLayout'

const PAGE_TITLE = 'Notification settings'
export const metadata = {
  title: PAGE_TITLE,
}

const NotificationsSettingsPage = async () => (
  <PageLayout className="px-3 lg:px-0">
    <NotificationToggle />
  </PageLayout>
)

export default NotificationsSettingsPage
