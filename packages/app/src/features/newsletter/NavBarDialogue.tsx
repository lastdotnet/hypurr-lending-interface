import { NewsletterDialog } from './components/NewsletterDialog'
import { MailIcon } from 'lucide-react'
import { Button } from '@/ui/atoms/button/Button'

export function NavBarDialogue() {
  return (
    <NewsletterDialog
      Trigger={
        <Button variant="ghost" className="flex gap-2 px-3 py-5 text-base xl:h-auto xl:py-2 xl:text-xs" type="button">
          <MailIcon className="h-4 w-4" /> Signup for updates
        </Button>
      }
    />
  )
}
