import { useStore } from '../state'

import { useEffect } from 'react'

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
