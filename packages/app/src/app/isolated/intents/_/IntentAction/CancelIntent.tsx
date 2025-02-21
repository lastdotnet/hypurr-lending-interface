'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { IntentDetails } from '@/app/isolated/intents/_/IntentDetails'
import type { IntentLocation } from '@/app/isolated/intents/_/constants'
import { Button, type ButtonProps } from '@/astaria/components/Button'
import { Card } from '@/astaria/components/Card'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogError,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { SwitchChainButton } from '@/astaria/components/SwitchChainButton'
import { useCancelIntent } from '@/astaria/hooks/useCancelIntent'
import { useChainId } from '@/astaria/hooks/useChainId'
import { removeBorrowIntentFromQuery } from '@/astaria/hooks/useIntents/removeBorrowIntentFromQuery'
import { removeLendIntentFromQuery } from '@/astaria/hooks/useIntents/removeLendIntentFromQuery'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'
import { isLendIntent } from '@/astaria/utils/intentStates'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

const CancelBorrowIntentInner = withChainCheckDialog(
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
    const { cancel, error, isConfirming, isLoading } = useCancelIntent({
      enabled: chainId === intent.chainId && (inView || dialogOpen),
      intent,
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
        setDialogOpen(false)
      },
      showError: dialogOpen,
    })
    const cancelIntent = () => {
      cancel()
    }

    const buttonLabel = () => {
      const intentType = getIntentCopy({
        borrow: 'borrow',
        intent,
        lend: 'lend',
      })

      if (isConfirming) {
        return `Confirming ${intentType} intent is cancelled`
      }
      if (isLoading) {
        return `Cancelling ${intentType} intent`
      }
      return `Cancel ${intentType} intent`
    }

    return (
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Cancel {getIntentCopy({ borrow: 'borrow', intent, lend: 'lend' })} intent</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Card receiptStyle>
            <IntentDetails highPrecision intent={intent} />
          </Card>
          {error ? <DialogError error={error} /> : null}
        </DialogContent>
        <DialogActions>
          {(() => {
            if (chainId !== intent.chainId) {
              return <SwitchChainButton chainId={intent.chainId} fullWidth rounded="dialog" />
            }

            return (
              <Button
                className="border-b-0 border-l-0 border-r-0"
                fullWidth
                loading={isLoading || isConfirming}
                onClick={() => cancelIntent()}
                rounded="dialog"
              >
                {buttonLabel()}
              </Button>
            )
          })()}
        </DialogActions>
      </DialogContainer>
    )
  },
)

export const CancelIntent = ({
  children,
  intent,
  intentLocation,
  ...rest
}: ButtonProps & {
  intent: BorrowIntent | LendIntent
  intentLocation: IntentLocation
}) => {
  const { inView, ref } = useInView()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button ref={ref} {...rest}>
          Cancel
          {children}
        </Button>
      </DialogTrigger>
      <CancelBorrowIntentInner
        dialogOpen={dialogOpen}
        intent={intent}
        intentLocation={intentLocation}
        inView={inView}
        setDialogOpen={setDialogOpen}
      />
    </Dialog>
  )
}
CancelIntent.displayName = 'CancelIntent'
