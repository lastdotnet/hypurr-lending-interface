'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface LinkDecoratorProps {
  children: ReactNode
  to: string
  external?: boolean
}

export function LinkDecorator({ children, to, external }: LinkDecoratorProps) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-sm px-3 transition-colors hover:bg-white/10"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={to} className="cursor-pointer rounded-sm px-3 transition-colors hover:bg-white/10">
      {children}
    </Link>
  )
}
