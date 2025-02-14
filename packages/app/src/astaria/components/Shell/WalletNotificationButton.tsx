'use client'

import { IconBell, IconBellX } from '@tabler/icons-react'
import { useNotifications, useSubscription, useWeb3InboxAccount } from '@web3inbox/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import { useLocalStorage } from 'usehooks-ts'

import { type ButtonProps } from '@/astaria/components/Button'
import { Button } from '@/astaria/components/Button'
import { Connected } from '@/astaria/components/Connected'
import { NotificationCount } from '@/astaria/components/Shell/NotificationCount'
import { FETCH_LIMIT } from '@/astaria/constants/constants'
import { ROUTES } from '@/astaria/constants/routes'

export const WalletNotificationButton = ({ ...rest }: Omit<ButtonProps, 'children'>) => {
  const [refreshId] = useLocalStorage('refreshId', '')
  const [isSkeleton, setSkeleton] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [startedLoading, setStartedLoading] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  const { address } = useAccount()
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`)
  const { getSubscription } = useSubscription()
  const {
    data: notifications,
    fetchNextPage,
    hasMore,
    isLoadingNextPage,
  } = useNotifications(FETCH_LIMIT, true, `eip155:1:${address}`) // define account explicitly, otherwise it has unexpected bahavior

  useEffect(() => {
    try {
      notifications
        ?.filter((notif) => notif.id === refreshId)
        .at(0)
        ?.read()

      setNotificationCount(notifications?.filter((notif) => !notif.isRead).length || 0)
    } catch (error) {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshId]) // listen for read loans on the dashboard page, isn't updated automatically

  useEffect(() => {
    setNotificationCount(notifications?.filter((notif) => !notif.isRead).length || 0)
    if (hasMore) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubscription()
      setIsSubscribed(data ? true : false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered])

  useEffect(() => {
    if (isLoadingNextPage) {
      setStartedLoading(true) // isLoadingNextPage starts with false
    }
    if (!hasMore && !isLoadingNextPage && startedLoading) {
      setSkeleton(false)
    }
  }, [hasMore, isLoadingNextPage, startedLoading])

  return (
    <Connected
      connectedComponent={
        <Button {...rest} asChild rounded={false}>
          <Link href={isSubscribed ? ROUTES.WALLET_NOTIFICATIONS_DASHBOARD : ROUTES.WALLET_NOTIFICATIONS_SETTINGS}>
            <div className="flex items-center gap-1">
              {isSubscribed ? <IconBell className="h-3.5 w-3.5" /> : <IconBellX className="h-3.5 w-3.5" />}
              {isRegistered ? (
                <NotificationCount isSkeleton={isSkeleton} notificationCount={notificationCount} />
              ) : null}
            </div>
          </Link>
        </Button>
      }
    />
  )
}
