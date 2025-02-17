import { Dialog, DialogContent } from '@/ui/atoms/dialog/Dialog'
import { DialogConfig, DialogProps } from '../common/types'
import { DepositDialogContentContainer } from './DepositDialogContentContainer'
import { useWrongNetwork } from '@/domain/hooks/useWrongNetwork'

function DepositDialog({ token, open, setOpen }: DialogProps) {
  const isWrongNetwork = useWrongNetwork()
  if (isWrongNetwork) {
    setOpen(false)
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DepositDialogContentContainer token={token} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export const depositDialogConfig: DialogConfig<DialogProps> = {
  options: {
    closeOnChainChange: true,
  },
  element: DepositDialog,
}
