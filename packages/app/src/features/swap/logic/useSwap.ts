import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAccount } from '@/domain/hooks/useAccount'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

const SwapFormSchema = z.object({
  fromAmount: z.string(),
  toAmount: z.string(),
  fromToken: z.string(),
  toToken: z.string(),
})

export type SwapFormSchema = z.infer<typeof SwapFormSchema>

export interface UseSwapResults {
  form: UseFormReturn<SwapFormSchema>
  pageStatus: 'form' | 'confirmation' | 'success'
  guestMode: boolean
  openConnectModal: () => void
}

export function useSwap(): UseSwapResults {
  const account = useAccount()
  const guestMode = !account
  const { setShowAuthFlow } = useDynamicContext()

  const form = useForm<SwapFormSchema>({
    resolver: zodResolver(SwapFormSchema),
    defaultValues: {
      fromAmount: '',
      toAmount: '',
      fromToken: '',
      toToken: '',
    },
  })

  return {
    form,
    pageStatus: 'form',
    guestMode,
    openConnectModal: () => setShowAuthFlow(true),
  }
}
