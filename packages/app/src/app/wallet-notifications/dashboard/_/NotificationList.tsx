import { type Dispatch, type SetStateAction } from 'react'

import { NotificationCard, type NotificationProps } from '@/app/wallet-notifications/dashboard/_/NotificationCard'
import { CardSection } from '@/astaria/components/Card'

type NotificationListProps = {
  defaultMessage: string
  notifications: NotificationProps[]
  setRefreshId: Dispatch<SetStateAction<string>>
}

export const NotificationList = ({ defaultMessage, notifications, setRefreshId }: NotificationListProps) =>
  notifications?.length ? (
    notifications.map((notification) => (
      <NotificationCard
        key={notification.id}
        body={notification.body}
        id={notification.id}
        isRead={notification.isRead}
        read={notification.read}
        sentAt={notification.sentAt}
        setRefreshId={setRefreshId}
        title={notification.title}
        type={notification.type}
      />
    ))
  ) : (
    <CardSection>
      <span>{defaultMessage}</span>
    </CardSection>
  )
