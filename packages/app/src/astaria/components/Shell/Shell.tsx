import { type ReactNode } from 'react'

import { SiteFooter } from '@/astaria/components/Shell/SiteFooter'
import { SiteNavigation } from '@/astaria/components/Shell/SiteNavigation'

export const Shell = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full min-h-screen min-w-80 flex-col">
    <SiteNavigation />
    {children}
    <SiteFooter />
  </div>
)
