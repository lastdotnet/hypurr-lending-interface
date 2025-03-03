import { Action } from '@/features/actions/logic/types'
import { UseContractActionParams, useContractAction } from '@/features/actions/logic/useContractAction'
import { raise } from '@/utils/assert'
import { useMemo } from 'react'
import { TransactionReceipt } from 'viem'
import { useChainId, useConfig } from 'wagmi'
import { SetupHookRendererArgs, setupHookRenderer } from './setupHookRenderer'
import { useAccount } from '@/domain/hooks/useAccount'

export function setupUseContractActionRenderer(
  defaultArgs: Omit<SetupHookRendererArgs<typeof useActionWrapper>, 'hook'>,
) {
  return setupHookRenderer({
    ...defaultArgs,
    hook: useActionWrapper,
  })
}

export interface UseActionWrapperParams extends Omit<UseContractActionParams, 'context'> {
  context?: Omit<UseContractActionParams['context'], 'chainId' | 'account' | 'wagmiConfig' | 'txReceipts'>
}

function useActionWrapper({ context, ...rest }: UseActionWrapperParams) {
  const chainId = useChainId()
  const address = useAccount()
  const wagmiConfig = useConfig()
  const txReceipts = useMemo<[Action, TransactionReceipt][]>(() => [], [])

  return useContractAction({
    context: {
      chainId,
      account: address ?? raise('account is not defined'),
      wagmiConfig,
      txReceipts,
      ...context,
    },
    ...rest,
  })
}
