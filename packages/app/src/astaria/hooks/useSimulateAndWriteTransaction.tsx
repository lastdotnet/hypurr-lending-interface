import { useSimulateContract } from 'wagmi'

import { useTransaction } from '@/astaria/hooks/useTransaction'
import { type FunctionData } from '@/astaria/types-internal/function-data'
import { wagmiConfig } from '../config/wagmi'

export const useSimulateAndWriteTransaction = ({
  enabled = true,
  onConfirmed,
  onMutate,
  onSuccess,
  onSuccessWrite,
  showError = true,
  simulateData,
  title,
}: {
  enabled?: boolean
  onConfirmed?: () => void
  onMutate?: () => void
  onSuccess?: () => void
  onSuccessWrite?: () => void
  showError?: boolean
  simulateData: FunctionData | undefined
  title: string
}) => {
  const {
    data,
    error: errorSimulate,
    isError: isErrorSimulate,
    isLoading: isLoadingSimulate,
  } = useSimulateContract({
    ...simulateData,
    query: {
      enabled,
    },
    config: wagmiConfig,
  })

  const {
    error: errorWrite,
    isConfirming,
    isError: isErrorWrite,
    isPendingWrite,
    writeContract,
    writeContractAsync,
    ...rest
  } = useTransaction({
    errorSimulate,
    isErrorSimulate,
    onConfirmed: () => {
      onConfirmed?.()
    },
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      onSuccess?.()
    },
    onSuccessWrite: () => {
      onSuccessWrite?.()
    },
    showError,
    title,
  })

  const error = errorWrite || errorSimulate
  const isError = isErrorWrite || isErrorSimulate
  const isLoading = isPendingWrite || isLoadingSimulate

  return {
    error,
    isConfirming,
    isError,
    isLoading,
    // See https://wagmi.sh/react/guides/migrate-from-v1-to-v2#removed-prepare-hooks
    writeContract: enabled && data ? () => writeContract(data.request) : () => undefined,
    writeContractAsync: enabled && data ? () => writeContractAsync(data.request) : () => undefined,
    ...rest,
  }
}
