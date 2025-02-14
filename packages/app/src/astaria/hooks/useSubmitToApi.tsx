import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { useToast } from '@/astaria/components/Toast/useToast'

export const useSubmitToApi = <TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>({
  errorMessage = {
    description: 'Your transaction failed. Please try again later.',
    title: 'Error',
  },
  mutationFn,
  onError,
  onSuccess,
  successMessage = {
    description: `Your transaction was sent!`,
    title: 'Transaction sent',
  },
}: UseMutationOptions<TData, TError, TVariables, TContext> & {
  errorMessage?: {
    description: string
    title: string
  }
  successMessage?: {
    description: string
    title: string
  }
}) => {
  const { toast } = useToast()

  const { error, mutate, ...rest } = useMutation({
    mutationFn,
    onError: (error: TError, variables: TVariables, context: TContext | undefined) => {
      toast(errorMessage)
      if (onError) {
        onError(error, variables, context)
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: TContext) => {
      toast(successMessage)
      if (onSuccess) {
        onSuccess(data, variables, context)
      }
    },
  })

  return {
    error,
    mutate,
    ...rest,
  }
}
