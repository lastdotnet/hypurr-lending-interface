import { Token } from '@/domain/types/Token'
import { Dialog, DialogContent } from '@/ui/atoms/dialog/Dialog'
import { CommonDialogProps, DialogConfig } from '../common/types'
import { RepayDialogContentContainer } from './RepayDialogContentContainer'
import { useWrongNetwork } from '@/domain/hooks/useWrongNetwork'

export interface RepayDialogProps extends CommonDialogProps {
  token: Token
}

function RepayDialog({ token, open, setOpen }: RepayDialogProps) {
  const isWrongNetwork = useWrongNetwork()
  if (isWrongNetwork) {
    setOpen(false)
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <RepayDialogContentContainer token={token} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export const repayDialogConfig: DialogConfig<RepayDialogProps> = {
  options: {
    closeOnChainChange: true,
  },
  element: RepayDialog,
}
