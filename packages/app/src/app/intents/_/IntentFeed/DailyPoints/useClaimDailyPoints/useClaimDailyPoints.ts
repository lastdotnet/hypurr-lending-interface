import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getCanClaimDailyPointsQueryKey } from '@/app/intents/_/IntentFeed/DailyPoints/getCanClaimDailyPointsQueryKey'
import { claimDailyPoints } from '@/app/intents/_/IntentFeed/DailyPoints/useClaimDailyPoints/claimDailyPoints'
import { useToast } from '@/astaria/components/Toast/useToast'
import { MIDNIGHT_HOURS } from '@/astaria/constants/constants'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

const NEXT_CLAIM_TIME_TOMORROW = new Date(new Date().setUTCHours(MIDNIGHT_HOURS, 0, 0, 0)).getTime()

export const useClaimDailyPoints = () => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { error, mutate, ...rest } = useMutation({
    mutationFn: claimDailyPoints,
    onError: () => {
      toast({
        description: 'An error occurred. Please try again later.',
        title: 'Unable to claim points',
      })
    },
    onSuccess: () => {
      const queryKey = getCanClaimDailyPointsQueryKey({ address })
      queryClient.setQueryData(queryKey, NEXT_CLAIM_TIME_TOMORROW)
      queryClient.invalidateQueries({
        queryKey,
      })
      queryClient.cancelQueries({
        queryKey,
      })
    },
  })

  return {
    claimDailyPoints: mutate,
    error,
    ...rest,
  }
}
