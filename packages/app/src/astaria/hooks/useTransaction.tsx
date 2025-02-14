import { addBreadcrumb } from '@sentry/nextjs'
import { IconCheck, IconX } from '@tabler/icons-react'
import { type ReactNode, useEffect, useState } from 'react'

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { BlockExplorerLink } from '@/astaria/components/BlockExplorerLink'
import { type Toast, type ToastReturnType, useToast } from '@/astaria/components/Toast/useToast'
import { processContractInteractionError } from '@/astaria/utils/errors'

const TRANSACTION_REJECTED_CODE = 4001

const getErrorMessage = (error: ErrorWithCause) => {
  if (error.cause?.code === TRANSACTION_REJECTED_CODE) {
    return 'You have rejected the transaction in your wallet.'
  }
  if (error?.cause?.message) {
    return error?.cause?.message
  }
  if (error?.message) {
    return processContractInteractionError(error)
  }
  return 'An error occurred while processing the transaction.'
}

type ErrorWithCause = Error & {
  cause?: {
    code: number
    message: string
  }
}

export const useTransaction = ({
  errorSimulate,
  isErrorSimulate,
  onConfirmed,
  onMutate,
  onSuccess,
  onSuccessWrite,
  showError = true,
  successDescriptionAddition,
  title,
}: {
  errorSimulate?: Error | null
  isErrorSimulate?: boolean
  onConfirmed?: () => void
  onMutate?: () => void
  onSuccess?: () => void
  onSuccessWrite?: () => void
  showError?: boolean
  successDescriptionAddition?: ReactNode
  title: string
}) => {
  const [transactionToast, setTransactionToast] = useState<ToastReturnType>()
  const { toast } = useToast()

  const {
    data: hash,
    error: errorWrite,
    isError: isErrorWrite,
    isPending: isPendingWrite,
    isSuccess: isSuccessWrite,
    writeContract,
    ...rest
  } = useWriteContract({
    mutation: { onMutate },
  })

  useEffect(() => {
    if (isSuccessWrite && hash) {
      const transactionToast = toast({
        description: (
          <>
            <p className="mb-3">Waiting for network confirmation</p>
            <BlockExplorerLink type="transaction" value={hash} />
          </>
        ),
        duration: Infinity,
        onOpenChange: (open) => {
          if (!open) {
            setTransactionToast(undefined)
          }
        },
        title: `${title} transaction sent`,
      })
      setTransactionToast(transactionToast)
      onSuccessWrite?.()
    }
    // equivalent to onSuccess
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessWrite])

  const {
    data: dataConfirmed,
    error: errorConfirm,
    isError: isErrorConfirm,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: isSuccessWrite,
    },
  })

  useEffect(() => {
    if (isConfirmed) {
      onConfirmed?.()
    }
    // equivalent to onSuccess
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed])

  const error = errorSimulate || errorWrite || errorConfirm

  useEffect(() => {
    if (showError && (isErrorSimulate || isErrorConfirm || isErrorWrite) && error) {
      const errorWithCause = error as ErrorWithCause
      const message = getErrorMessage(errorWithCause)

      const toastContent: Toast = {
        description: message,
        icon: <IconX className="h-4 w-4" />,
        title: `${title} transaction error!`,
      }

      if (transactionToast) {
        transactionToast.update({
          id: transactionToast.id,
          ...toastContent,
        })
        setTransactionToast(undefined)
      } else {
        toast(toastContent)
      }

      addBreadcrumb({
        category: 'transaction',
        data: error,
        level: 'info',
        message: `${title} Transaction failure`,
      })
    }
    // equivalent to onError
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showError, error, isErrorSimulate, isErrorConfirm, isErrorWrite])

  useEffect(() => {
    if (isConfirmed) {
      const toastContent: Toast = {
        description: (
          <div className="space-y-4">
            <p>Transaction successfully confirmed by network.</p>
            <p>
              <BlockExplorerLink type="transaction" value={hash} />
            </p>
            {successDescriptionAddition ? successDescriptionAddition : null}
          </div>
        ),
        icon: <IconCheck className="h-4 w-4" />,
        title: `${title} transaction confirmed`,
      }

      if (transactionToast) {
        transactionToast.update({
          ...toastContent,
          id: transactionToast.id,
        })
        setTransactionToast(undefined)
      } else {
        toast(toastContent)
      }

      addBreadcrumb({
        category: 'transaction',
        data: dataConfirmed,
        level: 'info',
        message: `${title} Transaction success`,
      })
      onSuccess?.()
    }
    // equivalent to onSuccess
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed])

  const isError = isErrorWrite || isErrorConfirm

  return {
    dataConfirmed,
    error,
    hash,
    isConfirmed,
    isConfirming,
    isError,
    isPendingWrite,
    writeContract,
    ...rest,
  }
}
