import { paths } from '@/config/paths'
import { cn } from '@/ui/utils/style'
import { FeedbackFish } from '@feedback-fish/react'

import { SavingsInfoQueryResults } from '../types'
import { ExternalNavLink, NavLink, PlaceholderNavLink } from './nav-link/NavLink'

export interface PageLinksInfo {
  daiSymbol?: string
  usdsSymbol?: string
}

export interface PageLinksProps {
  mobileMenuCollapsed: boolean
  closeMobileMenu: () => void
  savingsInfo: SavingsInfoQueryResults | undefined
  pageLinksInfo: PageLinksInfo
}

export function PageLinks({ mobileMenuCollapsed, closeMobileMenu }: PageLinksProps) {
  function handleNavigate() {
    closeMobileMenu()
  }

  const links = [
    {
      to: paths.easyBorrow,
      label: 'Borrow',
      onClick: handleNavigate,
    },
    {
      to: paths.dashboard,
      label: 'Dashboard',
      onClick: handleNavigate,
    },
    {
      to: paths.markets,
      label: 'Markets',
      onClick: handleNavigate,
    },
    {
      label: 'Isolated markets',
    },
    {
      to: paths.faucet,
      label: 'Faucet',
      onClick: handleNavigate,
    },
  ]

  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-start gap-6 py-6 font-sans',
        'xl:flex xl:flex-row xl:justify-center xl:py-0 xl:pt-0',
        mobileMenuCollapsed && 'hidden xl:flex',
      )}
    >
      {links.map((link) =>
        link.to ? (
          <NavLink key={link.to} to={link.to} onClick={link.onClick}>
            {link.label}
          </NavLink>
        ) : (
          <PlaceholderNavLink key={link.label} withIndicator={false}>
            {link.label}
          </PlaceholderNavLink>
        ),
      )}

      <ExternalNavLink href="http://docs.hypurr.fi/">Docs</ExternalNavLink>

      <FeedbackFish projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID || ''}>
        <button className="cursor-pointer rounded-md text-left text-white/50 text-xl hover:text-white xl:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Feedback
        </button>
      </FeedbackFish>
    </div>
  )
}
