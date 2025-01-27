import { Typography } from '@/ui/atoms/typography/Typography'

export function BorrowRateBanner() {
  return (
    <div className="flex flex-col items-center md:mt-12">
      <div className="flex items-center gap-2">
        <Typography variant="h1" gradient className="text-center">
          Quick Deposit & Borrow
        </Typography>
      </div>
      <Typography variant="h2" className="mt-6 text-center font-normal text-base text-white/60">
        Deposit and borrow native Hyperliquid assets for leveraged yield that purrrrrrs.
      </Typography>
    </div>
  )
}
