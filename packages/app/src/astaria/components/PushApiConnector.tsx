'use client'

import { useWeb3InboxClient } from '@web3inbox/react'
import { useEffect } from 'react'

import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

import { ENV } from '@/astaria/constants/environment'

export const PushApiConnector = ({ isOpen }: { isOpen: boolean }) => {
  const { data: client } = useWeb3InboxClient()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      const app = initializeApp({
        apiKey: ENV.NEXT_PUBLIC_FIREBASE_API_KEY,
        appId: ENV.NEXT_PUBLIC_FIREBASE_APP_ID,
        authDomain: `${ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
        messagingSenderId: ENV.NEXT_PUBLIC_FIREBASE_SENDER_ID,
        projectId: ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: `${ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
      })

      const firebaseMessaging = getMessaging(app)

      getToken(firebaseMessaging, {
        vapidKey: ENV.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
        .then(async (res) => {
          if (client) {
            await client.registerWithPushServer(res)
          }
        })
        .catch(() => undefined)
    } catch (_error) {
      return
    }
  }, [client, isOpen])

  return null
}
