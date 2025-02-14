'use client'

import { IconPlus } from '@tabler/icons-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

import { TransmitIntent } from '@/app/intents/_/TransmitIntent/TransmitIntent'
import { Button } from '@/astaria/components/Button'
import { Dialog, DialogContainer, DialogHeader, DialogTitle, DialogTrigger } from '@/astaria/components/Dialog'
import { withChainCheckDialog } from '@/astaria/utils/withChainCheckDialog'

const TransmitIntentDialogInner = withChainCheckDialog(
  ({
    isOnConfirmSteps,
    setDialogOpen,
    setIsOnConfirmSteps,
  }: {
    isOnConfirmSteps: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    setIsOnConfirmSteps: Dispatch<SetStateAction<boolean>>
  }) => (
    <DialogContainer>
      <DialogHeader>
        <DialogTitle>Transmit a loan intent</DialogTitle>
      </DialogHeader>
      <TransmitIntent
        isOnConfirmSteps={isOnConfirmSteps}
        setDialogOpen={setDialogOpen}
        setIsOnConfirmSteps={setIsOnConfirmSteps}
      />
    </DialogContainer>
  ),
)

export const TransmitIntentDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isOnConfirmSteps, setIsOnConfirmSteps] = useState(false)

  return (
    <Dialog
      onOpenChange={(open) => {
        setDialogOpen(open)
        setIsOnConfirmSteps(false)
      }}
      open={dialogOpen}
    >
      <DialogTrigger asChild>
        <Button>
          New intent <IconPlus />
        </Button>
      </DialogTrigger>
      <TransmitIntentDialogInner
        isOnConfirmSteps={isOnConfirmSteps}
        setDialogOpen={setDialogOpen}
        setIsOnConfirmSteps={setIsOnConfirmSteps}
      />
    </Dialog>
  )
}
