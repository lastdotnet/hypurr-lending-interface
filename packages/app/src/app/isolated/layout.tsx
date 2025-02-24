import { SiteNavigation } from '@/astaria/components/Shell/SiteNavigation'

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20 flex h-full min-h-screen min-w-80 flex-col">
      <SiteNavigation />
      {children}
    </div>
  )
}
