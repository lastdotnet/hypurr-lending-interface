import { paths } from '@/config/paths'
import { cn } from '@/ui/utils/style'
import { FeedbackFish } from '@feedback-fish/react'

import { SavingsInfoQueryResults } from '../types'
import { NavLink } from './nav-link/NavLink'

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
      to: paths.faucet,
      label: 'Faucet',
      onClick: handleNavigate,
    },
  ]

  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-6 py-6 font-sans',
        'lg:flex lg:flex-row lg:justify-center lg:py-0 lg:pt-0',
        mobileMenuCollapsed && 'hidden lg:flex',
      )}
    >
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={link.onClick}>
          {link.label}
        </NavLink>
      ))}

      <FeedbackFish projectId={import.meta.env.VITE_FEEDBACK_FISH_PROJECT_ID}>
        <button className="cursor-pointer rounded-md text-left text-white/50 text-xl hover:text-white lg:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Give us feedback
        </button>
      </FeedbackFish>
    </div>
  )
}
