import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogTitle } from '@/ui/atoms/dialog/Dialog'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
import { useState } from 'react'

export function NewsletterDialogContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <div className="grid max-w-xl grid-cols-[minmax(0,1fr)] items-center gap-y-5">
      <DialogTitle className="col-span-full">Sign up for updates</DialogTitle>
      <DialogPanel className="col-span-full w-full">
        <div className="relative w-full">
          {!isLoaded && <Skeleton className="absolute aspect-square w-full xl:aspect-[3/2]" />}
          <iframe
            onLoad={() => {
              setIsLoaded(true)
            }}
            src="https://embeds.beehiiv.com/ef1709ee-371e-4dd3-b334-431881f91eb9"
            data-test-id="beehiiv-embed"
            className="aspect-square w-full xl:aspect-[3/2]"
            style={{
              border: 'none',
              maxHeight: '70vh',
            }}
          />
        </div>
      </DialogPanel>
    </div>
  )
}
