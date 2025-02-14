import { decrypt } from '@walletconnect/utils'
import { jwtDecode } from 'jwt-decode'

import { RECALL_ID, WELCOME_ID } from '@/astaria/constants/walletNotificationId'

interface NotifyMessage {
  body: string
  icon: string
  title: string
  type: string
  url: string
}

interface NotifyMessageJWTClaims {
  act: string
  app: string
  exp: number
  iat: number
  iss: string
  ksu: string
  msg: NotifyMessage
  sub: string
}

const formatMessage = ({ body, type }: { body: string; type: string }) => {
  switch (type) {
    case RECALL_ID:
      return 'One of your loans is recalled.'
    case WELCOME_ID:
      return body
    default:
      throw new Error(`Unidentified type: ${type}`)
  }
}

export const formatNotifications = ({
  encoded,
  symKey,
}: {
  encoded: string
  symKey: string
}) => {
  const payload = decrypt({
    encoded,
    symKey,
  })
  const jsonPayload = JSON.parse(payload)
  const result = jwtDecode<NotifyMessageJWTClaims>(jsonPayload.params.messageAuth)

  return {
    body: formatMessage({
      body: result.msg.body,
      type: result.msg.type,
    }),
    icon: result.msg.icon,
    title: result.msg.title,
  }
}
