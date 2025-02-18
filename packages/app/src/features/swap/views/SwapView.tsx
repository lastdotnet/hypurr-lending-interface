import { PageLayout } from '@/ui/layouts/PageLayout'
import { SwapPanel } from '../components/SwapPanel'
import { UseFormReturn } from 'react-hook-form'
import { SwapFormSchema } from '@/features/swap/logic/useSwap'

interface SwapViewProps {
  form: UseFormReturn<SwapFormSchema>
}

export function SwapView(props: SwapViewProps) {
  return (
    <PageLayout>
      <div className="mt-8 flex justify-center">
        <SwapPanel {...props} />
      </div>
    </PageLayout>
  )
}
