'use client'

import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { FillIntentDialogContainer } from '@/app/isolated/intents/_/IntentAction/FillIntent/FillIntentDialogContainer'
import { useWriteFillIntent } from '@/app/isolated/intents/_/IntentAction/FillIntent/useWriteFillIntent'
import { useAllowanceCollateral } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceCollateral'
import { type IntentLocation } from '@/app/isolated/intents/_/constants'
import { isVerifiedIntent } from '@/app/isolated/intents/_/isVerifiedIntent'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { Dialog } from '@/astaria/components/Dialog'
import { useChainId } from '@/astaria/hooks/useChainId'
import { removeBorrowIntentFromQuery } from '@/astaria/hooks/useIntents/removeBorrowIntentFromQuery'
import { removeLendIntentFromQuery } from '@/astaria/hooks/useIntents/removeLendIntentFromQuery'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { isLendIntent } from '@/astaria/utils/intentStates'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

export const FillIntentDialogInner = withChainCheckDialog(
  ({
    dialogOpen,
    intent,
    intentLocation,
    inView,
    setDialogOpen,
  }: {
    dialogOpen: boolean
    inView: boolean
    intent: BorrowIntent | LendIntent
    intentLocation: IntentLocation
    setDialogOpen: Dispatch<SetStateAction<boolean>>
  }) => {
    const chainId = useChainId()
    const queryClient = useQueryClient()
    const [isFinishedFillIntent, setIsFinishedFillIntent] = useState(false)

    const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove, needsAllowanceReset } =
      useAllowanceCollateral({
        asset: isLendIntent(intent) ? intent.collateral : intent.borrow,
        enabled: chainId === intent.chainId && (inView || dialogOpen),
        showError: dialogOpen,
      })

    const {
      error: errorFillIntent,
      fillIntent,
      isConfirming: isConfirmingFillIntent,
      isLoading: isLoadingFillIntent,
    } = useWriteFillIntent({
      enabled: chainId === intent.chainId && (inView || dialogOpen),
      intent,
      isFinishedApprove,
      isFinishedFillIntent,
      onConfirmed: () => {
        isLendIntent(intent)
          ? removeLendIntentFromQuery({
              intentLocation,
              lendIntent: intent,
              queryClient,
            })
          : removeBorrowIntentFromQuery({
              borrowIntent: intent,
              intentLocation,
              queryClient,
            })
        setIsFinishedFillIntent(true)
        setDialogOpen(false)
      },
      showError: dialogOpen,
    })

    const error = errorApprove || errorFillIntent

    return (
      <FillIntentDialogContainer
        approve={approve}
        asset={intent.borrow}
        error={error}
        fillIntent={fillIntent}
        intent={intent}
        isConfirmingApprove={isConfirmingApprove}
        isConfirmingFillIntent={isConfirmingFillIntent}
        isFinishedApprove={isFinishedApprove}
        isFinishedFillIntent={isFinishedFillIntent}
        isLoadingApprove={isLoadingApprove}
        isLoadingFillIntent={isLoadingFillIntent}
        needsAllowanceReset={needsAllowanceReset}
      />
    )
  },
)

export const FillIntent = ({
  children,
  intent,
  intentLocation,
  ...rest
}: ButtonProps & {
  intent: BorrowIntent | LendIntent
  intentLocation: IntentLocation
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { inView, ref } = useInView()

  return (
    <>
      <Button ref={ref} emphasis="medium" fullWidth onClick={() => setDialogOpen(true)} {...rest}>
        {children}
        {!isVerifiedIntent({ intent }) ? <IconAlertTriangleFilled /> : null}
      </Button>
      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <FillIntentDialogInner
          dialogOpen={dialogOpen}
          intent={intent}
          intentLocation={intentLocation}
          inView={inView}
          setDialogOpen={setDialogOpen}
        />
      </Dialog>
    </>
  )
}
