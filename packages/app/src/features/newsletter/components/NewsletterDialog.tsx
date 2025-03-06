import { Dialog, DialogContent, DialogTrigger } from '@/ui/atoms/dialog/Dialog'

import { NewsletterDialogContent } from './NewsletterDialogContent'

export interface NewsletterDialogProps {
  Trigger: React.ReactNode
}

export function NewsletterDialog({ Trigger }: NewsletterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <NewsletterDialogContent />
      </DialogContent>
    </Dialog>
  )
}
