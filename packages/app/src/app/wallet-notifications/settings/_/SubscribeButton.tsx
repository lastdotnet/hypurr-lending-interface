import { type Dispatch, type SetStateAction } from 'react'

import { SubscribeAccount } from '@/app/wallet-notifications/settings/_/SubscribeAccount'
import { Button } from '@/astaria/components/Button'
import { RECALL_ID, WELCOME_ID } from '@/astaria/constants/walletNotificationId'

type SubscribeButtonProps = {
  isRecall: boolean
  isRegistered: boolean
  setRegistrationOpen: Dispatch<SetStateAction<boolean>>
}

export const SubscribeButton = ({ isRecall, isRegistered, setRegistrationOpen }: SubscribeButtonProps) =>
  isRegistered ? (
    <SubscribeAccount
      typesDict={{
        [RECALL_ID]: isRecall,
        [WELCOME_ID]: true,
      }}
    />
  ) : (
    <Button
      fullWidth
      onClick={() => {
        setRegistrationOpen(true)
      }}
    >
      {' '}
      Sign and register{' '}
    </Button>
  )
