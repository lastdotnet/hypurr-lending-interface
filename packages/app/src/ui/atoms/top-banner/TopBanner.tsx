import { XIcon } from 'lucide-react'
import { Button } from '../button/Button'

interface TopBannerProps {
  onClose: () => void
}

export const TOP_BANNER_ID = 'top-banner-4'

export function TopBanner({ onClose }: TopBannerProps) {
  return (
    <div className="relative top-0 right-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-2 bg-primary-bg p-2 text-center text-body text-sm xl:fixed sm:flex-row">
      <p className="px-10">This app is now live on Hyperliquid EVM Mainnet.</p>

      <Button variant="icon" size="sm" className="-translate-y-1/2 absolute top-1/2 right-1.5" onClick={onClose}>
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
