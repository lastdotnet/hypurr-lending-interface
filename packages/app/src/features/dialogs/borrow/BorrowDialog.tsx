import { Token } from '@/domain/types/Token'
import { Dialog, DialogContent } from '@/ui/atoms/dialog/Dialog'

import { useWrongNetwork } from '@/domain/hooks/useWrongNetwork'
import { CommonDialogProps, DialogConfig } from '../common/types'
import { BorrowDialogContentContainer } from './BorrowDialogContentContainer'

export interface BorrowDialogProps extends CommonDialogProps {
  token: Token
}

function BorrowDialog({ token, open, setOpen }: BorrowDialogProps) {
  const isWrongNetwork = useWrongNetwork()
  if (isWrongNetwork) {
    setOpen(false)
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <BorrowDialogContentContainer token={token} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export const borrowDialogConfig: DialogConfig<BorrowDialogProps> = {
  options: {
    closeOnChainChange: true,
  },
  element: BorrowDialog,
}
