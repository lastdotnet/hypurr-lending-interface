'use client'

import { useEffect, useRef } from 'react'

const baseSettings = {
  apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY,
  integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID,
  organizationId: process.env.NEXT_PUBLIC_INKEEP_ORGANIZATION_ID,
  primaryBrandColor: '#000000',
}

export const InkeepChatButton = () => {
  const chatButtonRef = useRef<any>(null)

  useEffect(() => {
    const loadInkeepJS = async () => {
      const inkeepJS = await import('@inkeep/uikit-js')
      const inkeep = inkeepJS.Inkeep(baseSettings)
      chatButtonRef.current = inkeep.embed({
        componentType: 'ChatButton',
        properties: {
          chatButtonType: 'PILL',
          baseSettings,
          aiChatSettings: {
            quickQuestions: ['How to get started?'],
          },
        },
      })
    }
    loadInkeepJS()
  }, [])

  return null
}
