'use client'

import { useEffect, useRef } from 'react'

const baseSettings = {
  apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY,
  integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID,
  organizationId: process.env.NEXT_PUBLIC_INKEEP_ORGANIZATION_ID,
  primaryBrandColor: '#70fbda',
}

export function InkeepChatButton() {
  const chatButtonRef = useRef<any>(null)

  useEffect(() => {
    async function loadInkeepJS() {
      const inkeepJS = await import('@inkeep/uikit-js')
      const inkeep = inkeepJS.Inkeep({})
      chatButtonRef.current = inkeep.embed({
        componentType: 'ChatButton',
        colorModeSync: {
          observedElement: document.documentElement,
          isDarkModeCallback: () => true,
          colorModeAttribute: 'class',
        },
        properties: {
          chatButtonType: 'ICON',
          baseSettings,
          aiChatSettings: {
            quickQuestions: ['What is HypurrFi?'],
            botAvatarSrcUrl: '/hypurr-paw.svg',
          },
        },
      })
    }
    void loadInkeepJS()

    return () => {
      if (chatButtonRef.current) {
        try {
          chatButtonRef.current.destroy()
        } catch (error) {
          console.error('Error destroying Inkeep chat button', error)
        }
      }
    }
  }, [])

  return null
}
