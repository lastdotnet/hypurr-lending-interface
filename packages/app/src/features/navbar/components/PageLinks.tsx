import { paths } from '@/config/paths'
import { cn } from '@/ui/utils/style'
import { FeedbackFish } from '@feedback-fish/react'

import { SavingsInfoQueryResults } from '../types'
import { focusVariants, NavLink, PlaceholderNavLink, textVariants } from './nav-link/NavLink'
import {
  ArrowRightLeftIcon,
  LayoutGridIcon,
  BarChartIcon,
  MessageSquareIcon,
  WalletCardsIcon,
  DropletIcon,
  ArrowDownUpIcon,
  UserPlusIcon,
} from 'lucide-react'

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
      label: 'Quick borrow',
      onClick: handleNavigate,
      icon: <ArrowRightLeftIcon className="h-5 w-5" />,
    },
    {
      to: paths.dashboard,
      label: 'Dashboard',
      onClick: handleNavigate,
      icon: <LayoutGridIcon className="h-5 w-5" />,
    },
    {
      to: paths.markets,
      label: 'Markets',
      onClick: handleNavigate,
      icon: <BarChartIcon className="h-5 w-5" />,
    },
    {
      to: paths.markets,
      label: 'Swap',
      onClick: handleNavigate,
      icon: <ArrowDownUpIcon className="h-5 w-5" />,
    },
    {
      to: paths.markets,
      label: 'Referrals',
      onClick: handleNavigate,
      icon: <UserPlusIcon className="h-5 w-5" />,
    },
    {
      label: 'Isolated',
      onClick: handleNavigate,
      icon: <MessageSquareIcon className="h-5 w-5" />,
    },
    {
      label: 'Staking',
      onClick: handleNavigate,
      icon: <WalletCardsIcon className="h-5 w-5" />,
    },
    {
      to: paths.faucet,
      label: 'Faucet',
      onClick: handleNavigate,
      icon: <DropletIcon className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col items-start gap-6 py-6 xl:pb-0',
        mobileMenuCollapsed && 'hidden xl:flex',
      )}
    >
      {links.map((link) =>
        link.to ? (
          <NavLink key={link.label} to={link.to} onClick={link.onClick} icon={link.icon}>
            {link.label}
          </NavLink>
        ) : (
          <PlaceholderNavLink key={link.label} icon={link.icon}>
            {link.label}
          </PlaceholderNavLink>
        ),
      )}

      <FeedbackFish projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID || ''}>
        <button
          className={cn(
            focusVariants(),
            textVariants({ selected: false, isPlaceholder: false }),
            'flex cursor-pointer items-center gap-4',
          )}
        >
          <MessageSquareIcon className="h-5 w-5" /> Give Feedback
        </button>
      </FeedbackFish>
    </div>
  )
}
