'use client'

import { StoreState } from '@/domain/state'
import { InkeepEmbedConfig } from '@inkeep/uikit-js/dist/types'
import { StateCreator } from 'zustand'

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
