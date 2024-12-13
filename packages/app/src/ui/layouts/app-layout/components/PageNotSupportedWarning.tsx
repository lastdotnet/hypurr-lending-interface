import { Button } from '@/ui/atoms/button/Button'
import { cn } from '@/ui/utils/style'
import { testIds } from '@/ui/utils/testIds'
import { AlertTriangle } from 'lucide-react'

export interface PageNotSupportedWarningProps {
  pageName: string
  openNetworkSelectDialog: () => void
  className?: string
}

export function PageNotSupportedWarning({ pageName, openNetworkSelectDialog }: PageNotSupportedWarningProps) {
  return (
    <>
      <div className="fixed inset-0 z-[1000]">
        <div className="fixed inset-0 bg-alpha-overlay backdrop-blur-[2px]" aria-hidden="true" />

        <div
          className={cn(
            'absolute bottom-0 flex min-h-28 w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-40',
            'bg-body p-4 shadow-[0_0_128px_rgba(0,0,0,0.1)]',
          )}
        >
          <div className="flex gap-4">
            <AlertTriangle className="h-8 w-8 text-[#FC4F37]" />
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-lg">
                {pageName} {pageName.endsWith('s') ? 'are' : 'is'} not supported on the network you are connected to.
              </p>
              <p className="text-white/50">Switch to other supported networks to unlock this page.</p>
            </div>
          </div>
          <Button
            className="mt-2 w-full px-16 lg:w-fit"
            onClick={openNetworkSelectDialog}
            data-testid={testIds.component.SwitchNotSupportedNetworkButton}
          >
            Switch network
          </Button>
        </div>
      </div>
    </>
  )
}
