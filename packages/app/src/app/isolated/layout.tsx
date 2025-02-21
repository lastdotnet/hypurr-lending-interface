import { SiteNavigation } from '@/astaria/components/Shell/SiteNavigation'

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen min-w-80 mt-20 flex-col">
      <SiteNavigation />
      {children}
    </div>
  )
}
