'use client'

import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface LinkDecoratorProps {
  children: ReactNode
  to: string
  external?: boolean
}

export function LinkDecorator({ children, to, external }: LinkDecoratorProps) {
  const router = useRouter()

  function onClick(e: React.MouseEvent) {
    e.preventDefault()

    if (external) {
      window.open(to, '_blank')
    } else {
      router.push(to)
    }
  }

  return (
    <Slot onClick={onClick} className="cursor-pointer rounded-sm px-3 transition-colors hover:bg-white/10">
      {children}
    </Slot>
  )
}
