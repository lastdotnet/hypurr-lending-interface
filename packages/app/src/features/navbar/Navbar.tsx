import { Link } from 'react-router-dom'

import { assets } from '@/ui/assets'
import { cn } from '@/ui/utils/style'
import { MobileMenuButton } from './components/MobileMenuButton'
import { NavbarActions } from './components/NavbarActions'
import { PageLinks } from './components/PageLinks'
import { useNavbar } from './logic/useNavbar'

export interface NavbarProps {
  mobileMenuCollapsed: boolean
  setMobileMenuCollapsed: (collapsed: boolean) => void
  className?: string
}

export function Navbar({ mobileMenuCollapsed, setMobileMenuCollapsed, className }: NavbarProps) {
  const { openSandboxDialog, savingsInfo, connectedWalletInfo, rewardsInfo, isSandboxEnabled, pageLinksInfo } =
    useNavbar()

  function closeMobileMenu() {
    setMobileMenuCollapsed(true)
  }

  return (
    <nav
      className={cn(
        'relative flex flex-col px-6',
        'xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-6',

        !mobileMenuCollapsed && 'h-full xl:h-auto',
        className,
      )}
    >
      <div className="flex h-20 shrink-0 flex-row items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={assets.hypurrLogo} alt="Hypurr logo" className="w-20" />
          <img src={assets.hypurrLogoText} alt="Hypurr logo" className="w-[74px]" />
        </Link>

        <MobileMenuButton mobileMenuCollapsed={mobileMenuCollapsed} setMobileMenuCollapsed={setMobileMenuCollapsed} />
      </div>

      <PageLinks
        closeMobileMenu={closeMobileMenu}
        mobileMenuCollapsed={mobileMenuCollapsed}
        savingsInfo={savingsInfo}
        pageLinksInfo={pageLinksInfo}
      />

      <NavbarActions
        mobileMenuCollapsed={mobileMenuCollapsed}
        openSandboxDialog={openSandboxDialog}
        connectedWalletInfo={connectedWalletInfo}
        rewardsInfo={rewardsInfo}
        isSandboxEnabled={isSandboxEnabled}
      />
    </nav>
  )
}
