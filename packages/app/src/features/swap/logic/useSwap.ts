import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
}

export function useSwap(): UseSwapResults {
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
  }
}
