'use client'

import { PointsButton } from '@/astaria/components/Shell/PointsButton'
import { WalletNotificationButton } from '@/astaria/components/Shell/WalletNotificationButton'
import { PRIMARY_NAV_ITEMS } from '@/astaria/components/Shell/navItems'
import { useBannerVisibility } from '@/domain/state/bannersVisibility'
import { NavLink } from '@/features/navbar/components/nav-link/NavLink'
import { TOP_BANNER_ID } from '@/ui/atoms/top-banner/TopBanner'
import { cn } from '@/ui/utils/style'
import { MobileNavigation } from './MobileNavigation'

export const SiteNavigation = () => {
  const { showBanner } = useBannerVisibility(TOP_BANNER_ID)

  return (
    <nav className={cn('mt-4 flex flex-row gap-6', showBanner && 'xl:pt-10')}>
      <div className={cn('flex flex-1 flex-row items-center gap-6 px-3 py-0 font-sans lg:px-0')}>
        <MobileNavigation />

        {PRIMARY_NAV_ITEMS?.map(({ href, label, icon }) => (
          <NavLink key={href} to={href} className="hidden sm:inline-flex" Icon={icon}>
            {label}
          </NavLink>
        ))}
        <PointsButton className="hidden sm:inline-flex" emphasis="low" size="md-narrow" />
        <WalletNotificationButton className="hidden sm:inline-flex" emphasis="low" size="md-narrow" />
      </div>
    </nav>
  )
}
