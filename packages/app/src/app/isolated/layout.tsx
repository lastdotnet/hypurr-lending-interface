import { SiteNavigation } from '@/astaria/components/Shell/SiteNavigation'
import { PageLayout } from '@/ui/layouts/PageLayout'

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageLayout className="max-w-6xl gap-8 pt-0 pb-0">
        <SiteNavigation />
      </PageLayout>
      {children}
    </div>
  )
}
