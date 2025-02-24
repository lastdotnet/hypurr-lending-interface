'use client'

import { useAccount } from '@/domain/hooks/useAccount'
import { cn } from '@/ui/utils/style'
import { FooterLinks } from './components/FooterLinks'
import { Logo } from './components/Logo'
import { MobileMenuButton } from './components/MobileMenuButton'
import { PageLinks } from './components/PageLinks'
import { AirdropBadge } from './components/airdrop-badge/AirdropBadge'
import { WalletButton } from './components/wallet-button/WalletButton'
import { useNavbar } from './logic/useNavbar'
export interface NavbarProps {
  mobileMenuCollapsed: boolean
  setMobileMenuCollapsed: (collapsed: boolean) => void
  showBanner: boolean
  className?: string
}

export function Navbar({ mobileMenuCollapsed, setMobileMenuCollapsed, showBanner, className }: NavbarProps) {
  const account = useAccount()
  const { savingsInfo, pageLinksInfo } = useNavbar()

  function closeMobileMenu() {
    setMobileMenuCollapsed(true)
  }

  return (
    <nav
      className={cn(
        'relative z-50 flex w-full flex-col px-6',
        'xl:min-h-[37.5rem]',
        !mobileMenuCollapsed && 'h-full xl:h-auto',
        showBanner && 'xl:pt-10',
        className,
      )}
    >
      <div className="flex h-20 shrink-0 flex-row items-center justify-between">
        <div className={cn(!mobileMenuCollapsed && 'hidden xl:block')}>
          <Logo />
        </div>

        <MobileMenuButton mobileMenuCollapsed={mobileMenuCollapsed} setMobileMenuCollapsed={setMobileMenuCollapsed} />

        <div className={cn('fixed top-3 right-3', mobileMenuCollapsed && 'hidden xl:block', showBanner && 'top-13')}>
          <WalletButton />
        </div>
      </div>

      <div className="mx-auto flex h-full max-w-fit flex-col justify-between gap-6 xl:ml-0 xl:pt-6">
        <div className="mx-auto flex max-w-fit flex-col xl:ml-0 xl:gap-6">
          <PageLinks
            closeMobileMenu={closeMobileMenu}
            mobileMenuCollapsed={mobileMenuCollapsed}
            savingsInfo={savingsInfo}
            pageLinksInfo={pageLinksInfo}
          />

          {account && (
            <div className={cn(mobileMenuCollapsed && 'hidden xl:block')}>
              <AirdropBadge isLoading={false} isError={false} className="w-full py-1.5 xl:w-40" />
            </div>
          )}
        </div>

        <FooterLinks mobileMenuCollapsed={mobileMenuCollapsed} />
      </div>
    </nav>
  )
}
