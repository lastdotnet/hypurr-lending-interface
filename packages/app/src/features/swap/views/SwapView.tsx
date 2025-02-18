import { PageLayout } from '@/ui/layouts/PageLayout'
import { SwapPanel } from '../components/SwapPanel'
import { UseFormReturn } from 'react-hook-form'
import { SwapFormSchema } from '@/features/swap/logic/useSwap'
import { TokenWithBalance } from '@/domain/common/types'
interface SwapViewProps {
  form: UseFormReturn<SwapFormSchema>
  assets: TokenWithBalance[]
  guestMode: boolean
  openConnectModal: () => void
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
