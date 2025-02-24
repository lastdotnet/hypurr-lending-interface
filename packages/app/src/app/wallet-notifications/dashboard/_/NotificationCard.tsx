'use client'

import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction } from 'react'

import { TimePassed } from '@/app/wallet-notifications/dashboard/_/TimePassed'
import { getNotificationBody } from '@/app/wallet-notifications/dashboard/_/getNotificationBody'
import { CardSection } from '@/astaria/components/Card'
import { RECALL_ID } from '@/astaria/constants/walletNotificationId'

export type NotificationProps = {
  body: string
  id: string
  isRead: boolean
  read: () => void
  sentAt: number
  title: string
  type: string
}

export const NotificationCard = ({
  body,
  id,
  isRead,
  read,
  sentAt,
  setRefreshId,
  title,
  type,
}: NotificationProps & {
  setRefreshId: Dispatch<SetStateAction<string>>
}) => {
  const { data: textBody } = useQuery({
    queryFn: () =>
      getNotificationBody({
        body,
        type,
      }),
    queryKey: ['getNotificationBody', { body, type }],
  })

  return (
    <CardSection className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="font-bold text-lg"
            style={{
              color: type === RECALL_ID ? '#C21818' : '#000000',
            }}
          >
            {title}
          </div>
          {!isRead ? (
            <button
              className="ml-1.5 h-2.5 w-2.5 animate-pulse rounded-full bg-red-600"
              onClick={() => {
                read()
                setRefreshId(id)
              }}
            />
          ) : null}
        </div>
        <TimePassed sentAt={sentAt} />
      </div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div dangerouslySetInnerHTML={{ __html: textBody || '' }} />
    </CardSection>
  )
}
