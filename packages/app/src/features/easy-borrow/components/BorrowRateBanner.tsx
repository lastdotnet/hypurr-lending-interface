import { Typography } from '@/ui/atoms/typography/Typography'

export function BorrowRateBanner() {
  const usdxlEnabled = import.meta.env.VITE_FEATURE_USDXL === '1'

  return (
    <div className="flex flex-col items-center md:mt-12">
      <div className="flex items-center gap-2">
        <Typography variant="h1" gradient className="text-center">
          {usdxlEnabled ? 'Borrow USDXL' : 'Quick Deposit & Borrow'}
        </Typography>
      </div>
      <Typography variant="h2" className="mt-6 text-center font-normal text-base text-white/60">
        {usdxlEnabled
          ? 'Deposit native Hyperliquid assets and borrow USDXL'
          : 'Deposit and borrow native Hyperliquid assets'}{' '}
        for leveraged yield that purrrrrrs.
      </Typography>
    </div>
  )
}
