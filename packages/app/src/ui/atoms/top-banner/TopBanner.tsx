import { XIcon } from 'lucide-react'
import { Button } from '../button/Button'

interface TopBannerProps {
  onClose: () => void
}

export const TOP_BANNER_ID = 'top-banner'

export function TopBanner({ onClose }: TopBannerProps) {
  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2 bg-primary-bg p-2 text-center text-body text-sm sm:flex-row">
      <p className="px-10">
        The testnet app has been redeployed and balances zeroed. Thank you for all testers so far, keep testing.
      </p>

      <Button variant="icon" size="sm" className="-translate-y-1/2 absolute top-1/2 right-1.5" onClick={onClose}>
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
