'use client'

import { IconCheck, IconX } from '@tabler/icons-react'
import { useNotificationTypes, useSubscribe, useSubscription } from '@web3inbox/react'

import { Button } from '@/astaria/components/Button'
import { useToast } from '@/astaria/components/Toast/useToast'
import { RECALL_ID, WELCOME_ID } from '@/astaria/constants/walletNotificationId'

const transformText = (id: string): string => {
  switch (id) {
    case RECALL_ID:
      return 'Recall Notifications'
    default:
      return 'Welcome Notifications'
  }
}

export const SubscribeAccount = ({
  typesDict,
}: {
  typesDict: Record<string, boolean>
}) => {
  const { toast } = useToast()
  const { isLoading: isSubscribing, subscribe } = useSubscribe()
  const { getSubscription } = useSubscription()
  const { update } = useNotificationTypes()

  const handleSubscription = async () => {
    try {
      const subscription = await getSubscription()
      let subscribeList: string[]
      if (!subscription) {
        await subscribe()
        subscribeList = [WELCOME_ID]
        await update(subscribeList)
      } else {
        subscribeList = Object.keys(typesDict).filter((id) => typesDict[id])
        await update(subscribeList)
      }
      toast({
        description: `You are subscribed for ${subscribeList.map((item) => transformText(item))}`,
        icon: <IconCheck />,
        title: 'Subscribed',
      })
    } catch (registerIdentityError) {
      toast({
        description: registerIdentityError as string,
        icon: <IconX />,
        title: 'Error during preferences modification',
      })
    }
  }

  return (
    <Button disabled={isSubscribing} fullWidth onClick={handleSubscription}>
      Save preferences
    </Button>
  )
}
