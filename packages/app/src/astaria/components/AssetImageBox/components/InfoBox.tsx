import { type ReactNode } from 'react'

export const InfoBox = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-0 left-0 flex h-8 items-center rounded-tl-sm border bg-white">{children}</div>
)
