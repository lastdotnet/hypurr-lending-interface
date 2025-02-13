import { assets } from '@/ui/assets'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <img src={assets.hypurrLogo} alt="Hypurr logo" className="w-20" />
      <img src={assets.hypurrLogoText} alt="Hypurr logo" className="w-[74px]" />
    </Link>
  )
}
