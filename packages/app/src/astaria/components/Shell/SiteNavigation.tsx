import { MobileNavigation } from '@/astaria/components/Shell/MobileNavigation'
import { NavButton } from '@/astaria/components/Shell/NavButton'
import { PointsButton } from '@/astaria/components/Shell/PointsButton'
import { WalletNotificationButton } from '@/astaria/components/Shell/WalletNotificationButton'
import { PRIMARY_NAV_ITEMS } from '@/astaria/components/Shell/navItems'

export const SiteNavigation = () => (
  <header className="flex h-13 justify-center border-b">
    <div className="flex w-full max-w-screen-xl justify-between p-1">
      <div className="flex items-center">
        <MobileNavigation />
        {PRIMARY_NAV_ITEMS?.map(({ href, label }) => (
          <NavButton key={href} className="-ml-px hidden lg:inline-flex" href={href}>
            {label}
          </NavButton>
        ))}
      </div>
      <div className="flex items-center">
        <PointsButton className="hidden lg:inline-flex" emphasis="low" size="md-narrow" />
        <WalletNotificationButton className="hidden lg:inline-flex" emphasis="low" size="md-narrow" />
      </div>
    </div>
  </header>
)
