import { NotificationToggle } from '@/app/wallet-notifications/settings/_/NotificationToggle'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

const PAGE_TITLE = 'Notification settings'
export const metadata = {
  title: PAGE_TITLE,
}

const NotificationsSettingsPage = async () => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <div className="flex flex-row items-center gap-4">
      <Typography variant="h2" gradient>
        {PAGE_TITLE}
      </Typography>
    </div>
    <NotificationToggle />
  </PageLayout>
)

export default NotificationsSettingsPage
