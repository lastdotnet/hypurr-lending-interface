import Image from 'next/image'
import { assets } from '@/ui/assets'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image src={assets.hypurrLogo} alt="Hypurr logo" className="w-20" />
      <Image src={assets.hypurrLogoText} alt="Hypurr logo" className="w-[74px]" />
    </Link>
  )
}
