import { PageLayout } from '@/ui/layouts/PageLayout'
import { SwapPanel } from '../components/SwapPanel'

export function SwapView() {
  return (
    <PageLayout>
      <div className="mt-8 flex justify-center">
        <SwapPanel />
      </div>
    </PageLayout>
  )
}
