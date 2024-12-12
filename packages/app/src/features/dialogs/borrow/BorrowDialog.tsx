import { Token } from '@/domain/types/Token'
import { Dialog, DialogContent } from '@/ui/atoms/dialog/Dialog'

import { CommonDialogProps, DialogConfig } from '../common/types'
import { BorrowDialogContentContainer } from './BorrowDialogContentContainer'
import { useWrongNetwork } from '@/domain/hooks/useWrongNetwork'

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
      <DialogContent>
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
