import { Token } from '@/domain/types/Token'
import { CommonDialogProps } from '@/features/dialogs/common/types'
import { Dialog, DialogContent } from '@/ui/atoms/dialog/Dialog'
import { UpgradeDialogContentContainer } from './UpgradeDialogContentContainer'

interface UpgradeDialogProps extends CommonDialogProps {
  fromToken: Token
  toToken: Token
}

export function UpgradeDialog({ fromToken, toToken, open, setOpen }: UpgradeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0" preventAutoFocus>
        <UpgradeDialogContentContainer fromToken={fromToken} toToken={toToken} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}