'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { type Address } from 'viem'

import { FillIntentDialogContainer } from '@/app/isolated/intents/_/IntentAction/FillIntent/FillIntentDialogContainer'
import { useWriteRecallBorrowIntent } from '@/app/isolated/intents/_/IntentAction/RecallBorrowIntent/useWriteRecallBorrowIntent'
import { useAllowanceCollateral } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceCollateral'
import type { IntentLocation } from '@/app/isolated/intents/_/constants'
import { getRefinanceTransaction } from '@/app/isolated/intents/_/getRefinanceTransaction'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { Dialog } from '@/astaria/components/Dialog'
import { useChainId } from '@/astaria/hooks/useChainId'
import { removeBorrowIntentFromQuery } from '@/astaria/hooks/useIntents/removeBorrowIntentFromQuery'
import { type BorrowIntentWithRecall } from '@/astaria/types-internal/intent-schemas'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'
import { useAccount } from '@/domain/hooks/useAccount'

export const RecallIntentDialogInner = withChainCheckDialog(
  ({
    borrowIntentWithRecall,
    dialogOpen,
    intentLocation,
    inView,
    setDialogOpen,
  }: {
    borrowIntentWithRecall: BorrowIntentWithRecall
    dialogOpen: boolean
    inView: boolean
    intentLocation: IntentLocation
    setDialogOpen: Dispatch<SetStateAction<boolean>>
  }) => {
    const address = useAccount()
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const [isFinishedRecallIntent, setIsFinishedRecallIntent] = useState(false)

    const {
      data: refinanceData,
      error: errorRefinanceData,
      isSuccess: isSuccessRefinanceData,
    } = useQuery({
      enabled: chainId === borrowIntentWithRecall.chainId && (inView || dialogOpen),
      // getRefinanceTransaction uses current block time for calculations. Disable cache for this query
      gcTime: 0,
      queryFn: () =>
        getRefinanceTransaction({
          chainId: borrowIntentWithRecall.chainId,
          intentId: borrowIntentWithRecall.id,
          lender: address as Address,
        }),

      queryKey: [
        'getRefinanceTransaction',
        {
          caveatId: borrowIntentWithRecall.id,
          chainId: borrowIntentWithRecall.chainId,
        },
      ],
    })

    const debtAsset = borrowIntentWithRecall.isRecall
      ? {
          ...borrowIntentWithRecall.borrow,
          amount: refinanceData?.amountWithInterest ?? borrowIntentWithRecall.borrow.amount,
        }
      : borrowIntentWithRecall.borrow

    const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove, needsAllowanceReset } =
      useAllowanceCollateral({
        asset: debtAsset,
        enabled:
          chainId === borrowIntentWithRecall.chainId &&
          (inView || dialogOpen) &&
          (!borrowIntentWithRecall.isRecall || isSuccessRefinanceData),
        showError: dialogOpen,
      })

    const {
      error: errorRecallIntent,
      fillIntent,
      isConfirming: isConfirmingRecallIntent,
      isLoading: isLoadingRecallIntent,
    } = useWriteRecallBorrowIntent({
      borrowIntentWithRecall,
      enabled: chainId === borrowIntentWithRecall.chainId && (inView || dialogOpen),
      isFinishedApprove,
      isFinishedRecallIntent,
      onConfirmed: () => {
        removeBorrowIntentFromQuery({
          borrowIntent: borrowIntentWithRecall,
          intentLocation,
          queryClient,
        })
        setIsFinishedRecallIntent(true)
        setDialogOpen(false)
      },
      showError: dialogOpen,
    })

    const error = errorRefinanceData || errorApprove || errorRecallIntent

    return (
      <FillIntentDialogContainer
        approve={approve}
        asset={debtAsset}
        error={error}
        fillIntent={fillIntent}
        intent={borrowIntentWithRecall}
        isConfirmingApprove={isConfirmingApprove}
        isConfirmingFillIntent={isConfirmingRecallIntent}
        isFinishedApprove={isFinishedApprove}
        isFinishedFillIntent={isFinishedRecallIntent}
        isLoadingApprove={isLoadingApprove}
        isLoadingFillIntent={isLoadingRecallIntent}
        needsAllowanceReset={needsAllowanceReset}
      />
    )
  },
)

export const RecallBorrowIntent = ({
  borrowIntentWithRecall,
  children,
  intentLocation,
  ...rest
}: ButtonProps & {
  borrowIntentWithRecall: BorrowIntentWithRecall
  intentLocation: IntentLocation
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { inView, ref } = useInView()
  return (
    <>
      <Button ref={ref} emphasis="medium" fullWidth onClick={() => setDialogOpen(true)} {...rest}>
        {children}
      </Button>
      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <RecallIntentDialogInner
          borrowIntentWithRecall={borrowIntentWithRecall}
          dialogOpen={dialogOpen}
          intentLocation={intentLocation}
          inView={inView}
          setDialogOpen={setDialogOpen}
        />
      </Dialog>
    </>
  )
}
