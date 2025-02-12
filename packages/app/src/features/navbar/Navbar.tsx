'use client'

import { cn } from '@/ui/utils/style'
import { MobileMenuButton } from './components/MobileMenuButton'
import { PageLinks } from './components/PageLinks'
import { useNavbar } from './logic/useNavbar'
import { AirdropBadge } from './components/airdrop-badge/AirdropBadge'
import { useAccount } from '@/domain/hooks/useAccount'
import { Logo } from './components/Logo'
import { FooterLinks } from './components/FooterLinks'
import { WalletButton } from './components/wallet-button/WalletButton'
export interface NavbarProps {
  mobileMenuCollapsed: boolean
  setMobileMenuCollapsed: (collapsed: boolean) => void
  className?: string
}

export function Navbar({ mobileMenuCollapsed, setMobileMenuCollapsed, className }: NavbarProps) {
  const account = useAccount()
  const { savingsInfo, pageLinksInfo } = useNavbar()

  function closeMobileMenu() {
    setMobileMenuCollapsed(true)
  }

  return (
    <nav
      className={cn(
        'relative z-50 flex w-full flex-col px-6',
        'xl:min-h-[37.5rem] xl:justify-between',
        !mobileMenuCollapsed && 'h-full xl:h-auto',
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex h-20 shrink-0 flex-row items-center justify-between">
          <Logo />

          <MobileMenuButton mobileMenuCollapsed={mobileMenuCollapsed} setMobileMenuCollapsed={setMobileMenuCollapsed} />

          <div className="fixed top-3 right-3 hidden xl:flex">
            <WalletButton />
          </div>
        </div>

        <PageLinks
          closeMobileMenu={closeMobileMenu}
          mobileMenuCollapsed={mobileMenuCollapsed}
          savingsInfo={savingsInfo}
          pageLinksInfo={pageLinksInfo}
        />

        {account && (
          <div className={cn(mobileMenuCollapsed && 'hidden xl:block')}>
            <AirdropBadge airdrop={undefined} isLoading={false} isError={false} className="w-40 py-1.5" />
          </div>
        )}
      </div>

      <FooterLinks mobileMenuCollapsed={mobileMenuCollapsed} />
    </nav>
  )
}
