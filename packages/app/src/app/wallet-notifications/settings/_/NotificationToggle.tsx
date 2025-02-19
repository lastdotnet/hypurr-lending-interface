'use client'

import { useNotificationTypes, useWeb3InboxAccount } from '@web3inbox/react'
import { useEffect, useState } from 'react'

import { RegisterAccount } from '@/app/wallet-notifications/settings/_/RegisterAccount'
import { SubscribeButton } from '@/app/wallet-notifications/settings/_/SubscribeButton'
import { Button } from '@/astaria/components/Button'
import { Card, CardSection } from '@/astaria/components/Card'
import { Label } from '@/astaria/components/Label'
import { SkeletonSwitch } from '@/astaria/components/SkeletonSwitch'
import { Switch } from '@/astaria/components/Switch'
import { TextLink } from '@/astaria/components/TextLink'
import { WALLET_CONNECT_URL } from '@/astaria/constants/urls'
import { RECALL_ID } from '@/astaria/constants/walletNotificationId'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export const NotificationToggle = () => {
  const [isSkeleton, setSkeleton] = useState(true)
  const [startedLoading, setStartedLoading] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [isRecall, enableRecall] = useState(false)

  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const { isLoading: accountLoading, isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`)
  const { data: existingTypes, isLoading: notificationLoading } = useNotificationTypes()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (accountLoading || notificationLoading) {
      setStartedLoading(true)
    }

    if (!accountLoading && !notificationLoading && startedLoading) {
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (existingTypes && existingTypes[RECALL_ID]?.enabled) {
        enableRecall(true)
      }
      setSkeleton(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountLoading, notificationLoading]) // loading starts with false

  return (
    <div>
      <Card className="md:mx-auto md:w-1/3">
        <CardSection className="space-y-6">
          <p>Toggle the events for which you’d like to receive notifications.</p>
          <p>
            {"Astaria utilizes WalletConnect's notification kit. "}
            <TextLink href={WALLET_CONNECT_URL}>Learn more</TextLink>
          </p>
        </CardSection>
        <CardSection>
          <Label above={false} className="flex items-center justify-between">
            <span className="font-medium">Loan recalls</span>
            {isSkeleton ? (
              <SkeletonSwitch />
            ) : (
              <Switch checked={isRecall} disabled={!isRegistered} onCheckedChange={() => enableRecall(!isRecall)} />
            )}
          </Label>
        </CardSection>
        {isSkeleton ? (
          <Button disabled={isSkeleton} fullWidth>
            Pending
          </Button>
        ) : (
          <SubscribeButton isRecall={isRecall} isRegistered={isRegistered} setRegistrationOpen={setRegistrationOpen} />
        )}
      </Card>
      <RegisterAccount isOpen={registrationOpen} setOpen={setRegistrationOpen} />
    </div>
  )
}
