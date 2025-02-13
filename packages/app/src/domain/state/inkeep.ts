'use client'

import { StateCreator } from 'zustand'
import { StoreState, useStore } from '@/domain/state'
import { InkeepEmbedConfig } from '@inkeep/uikit-js/dist/types'
import { useEffect } from 'react'

export interface InkeepSlice {
  inkeep: {
    widget: any | null
    setWidget: (widget: any) => void
    handleOpen: () => void
    config: InkeepEmbedConfig
  }
}

const defaultConfig: InkeepEmbedConfig = {
  componentType: 'CustomTrigger' as const,
  targetElement: undefined,
  properties: {
    isOpen: false,
    baseSettings: {
      apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY,
      integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID,
      organizationId: process.env.NEXT_PUBLIC_INKEEP_ORGANIZATION_ID,
      primaryBrandColor: '#70fbda',
      colorMode: {
        forcedColorMode: 'dark',
      },
    },
    modalSettings: {
      defaultView: 'AI_CHAT',
    },
    searchSettings: {},
    aiChatSettings: {
      quickQuestions: ['What is HypurrFi?'],
      botAvatarSrcUrl: '/hypurr-paw.svg',
    },
  },
}

// eslint-disable-next-line func-style
export const initInkeepSlice: StateCreator<StoreState, [], [], InkeepSlice> = (set, get) => ({
  inkeep: {
    widget: null,
    setWidget: (widget) =>
      set((state) => ({
        inkeep: { ...state.inkeep, widget },
      })),
    handleOpen: () => {
      const { widget, config } = get().inkeep
      widget?.render({
        ...config,
        isOpen: true,
      })
    },
    config: {
      ...defaultConfig,
      properties: {
        ...defaultConfig.properties,
        isOpen: false,
        onClose: () => {
          const { widget, config } = get().inkeep
          widget?.render({
            ...config,
            isOpen: false,
          })
        },
      },
    },
  },
})

export function useInkeep(): { handleOpen: () => void } {
  const { setWidget, handleOpen, config } = useStore((state) => state.inkeep)

  useEffect(() => {
    async function loadInkeepJS(): Promise<void> {
      try {
        const inkeepJS = await import('@inkeep/uikit-js')
        const inkeep = inkeepJS.Inkeep({})
        const widget = inkeep.embed(config)
        setWidget(widget)
      } catch (error) {
        console.error('Failed to load Inkeep:', error)
      }
    }

    void loadInkeepJS()
  }, [config, setWidget])

  return { handleOpen }
}
