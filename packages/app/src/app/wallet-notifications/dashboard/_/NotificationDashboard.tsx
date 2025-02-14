'use client'

import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { useNotifications } from '@web3inbox/react'
import { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import { useLocalStorage } from 'usehooks-ts'

import { type NotificationProps } from '@/app/wallet-notifications/dashboard/_/NotificationCard'
import { NotificationList } from '@/app/wallet-notifications/dashboard/_/NotificationList'
import { Card, CardSection } from '@/astaria/components/Card'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { FETCH_LIMIT } from '@/astaria/constants/constants'
import { RECALL_ID, WELCOME_ID } from '@/astaria/constants/walletNotificationId'

export const NotificationDashboard = () => {
  const [refreshId, setRefreshId] = useLocalStorage('refreshId', '')
  const [startedLoading, setStartedLoading] = useState(false)
  const [criticalNotifications, setCriticalNotifications] = useState<NotificationProps[]>([])
  const [promotionalNotifications, setPromotionalNotifications] = useState<NotificationProps[]>([])

  const { address } = useAccount()
  const {
    data: notifications,
    fetchNextPage,
    hasMore,
    isLoadingNextPage,
  } = useNotifications(FETCH_LIMIT, true, `eip155:1:${address}`)

  useEffect(() => {
    if (isLoadingNextPage) {
      setStartedLoading(true) // isLoadingNextPage starts with false
    }
  }, [isLoadingNextPage])

  useEffect(() => {
    if (notifications) {
      setCriticalNotifications(
        notifications
          ?.filter((notif) => notif.type === RECALL_ID)
          .map((notif) => ({
            body: notif.body,
            id: notif.id,
            isRead: notif.isRead,
            read: notif.read,
            sentAt: notif.sentAt,
            title: notif.title,
            type: notif.type,
          }))
          .sort((a, b) => {
            if (a.isRead !== b.isRead) {
              return a.isRead ? 1 : -1
            }
            return b.sentAt - a.sentAt
          }),
      )

      setPromotionalNotifications(
        notifications
          ?.filter((notif) => notif.type === WELCOME_ID)
          .map((notif) => ({
            body: notif.body,
            id: notif.id,
            isRead: notif.isRead,
            read: notif.read,
            sentAt: notif.sentAt,
            title: notif.title,
            type: notif.type,
          }))
          .sort((a, b) => {
            if (a.isRead !== b.isRead) {
              return a.isRead ? 1 : -1
            }
            return b.sentAt - a.sentAt
          }),
      )
    }

    if (hasMore) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, refreshId])

  return (
    <Card>
      <CardSection>
        <span>
          <IconAlertTriangleFilled className="inline h-5 w-5" /> <strong>High priority</strong>
        </span>
      </CardSection>
      {(!isLoadingNextPage && startedLoading) || (startedLoading && notifications?.length) ? (
        <NotificationList
          defaultMessage="Notifications about your loans going into recall or liquidation
          will appear here."
          notifications={criticalNotifications}
          setRefreshId={setRefreshId}
        />
      ) : (
        <CardSection>
          <SkeletonText />
        </CardSection>
      )}
      <CardSection>
        <span>
          <strong>All other notifications</strong>
        </span>
      </CardSection>
      {(!isLoadingNextPage && startedLoading) || (startedLoading && notifications?.length) ? (
        <NotificationList
          defaultMessage="Notifications about any promotions from Astaria will appear here."
          notifications={promotionalNotifications}
          setRefreshId={setRefreshId}
        />
      ) : (
        <CardSection>
          <SkeletonText />
        </CardSection>
      )}
    </Card>
  )
}
