import { type ReactNode } from 'react'

export const IndicatorBox = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-2 right-2 flex w-12 flex-col items-center border bg-white">{children}</div>
)
