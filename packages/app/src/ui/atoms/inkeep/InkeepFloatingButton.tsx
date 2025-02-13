'use client'

import { useInkeep } from '@/domain/state/inkeep'

export function InkeepFloatingButton() {
  const { handleOpen } = useInkeep()
  return (
    <button className="fixed right-4 bottom-4 z-50" onClick={handleOpen}>
      Ask AI
    </button>
  )
}
