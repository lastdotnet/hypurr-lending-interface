import { assets } from '@/ui/assets'
import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'
import { useConfetti } from 'use-confetti-svg'
interface ConfettiContextProps {
  runAnimation: () => Promise<void>
  animating: boolean
}

const ConfettiContext = createContext<ConfettiContextProps | undefined>(undefined)

export function ConfettiProvider({ children }: PropsWithChildren) {
  const [animating, setAnimating] = useState(false)

  const { runAnimation } = useConfetti({
    images: [
      {
        src: assets.hypurrPaw,
        size: 48,
      },
    ],
    duration: 1000,
    fadeOut: 400,
    particleCount: 25,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleRunAnimation = useCallback(async () => {
    setAnimating(true)
    await runAnimation()
    setAnimating(false)
  }, [])

  return (
    <ConfettiContext.Provider value={{ runAnimation: handleRunAnimation, animating }}>
      {children}
    </ConfettiContext.Provider>
  )
}

export function useConfettiContext() {
  const context = useContext(ConfettiContext)
  if (!context) {
    throw new Error('useConfettiContext must be used within a ConfettiProvider')
  }
  return context
}
