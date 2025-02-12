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

const links = [
  {
    to: paths.easyBorrow,
    label: 'Quick borrow',
    icon: ArrowRightLeftIcon,
  },
  {
    to: paths.dashboard,
    label: 'Dashboard',
    icon: LayoutGridIcon,
  },
  {
    to: paths.markets,
    label: 'Markets',
    icon: BarChartIcon,
  },
  {
    to: paths.markets,
    label: 'Swap',
    icon: ArrowDownUpIcon,
  },
  {
    to: paths.markets,
    label: 'Referrals',
    icon: UserPlusIcon,
  },
  {
    label: 'Isolated',
    icon: MessageSquareIcon,
  },
  {
    label: 'Staking',
    icon: WalletCardsIcon,
  },
  {
    to: paths.faucet,
    label: 'Faucet',
    icon: DropletIcon,
  },
]

export function PageLinks({ mobileMenuCollapsed, closeMobileMenu }: PageLinksProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col items-start gap-6 py-6 xl:pb-0',
        mobileMenuCollapsed && 'hidden xl:flex',
      )}
    >
      {links.map((link) =>
        link.to ? (
          <NavLink key={link.label} to={link.to} onClick={closeMobileMenu} Icon={link.icon}>
            {link.label}
          </NavLink>
        ) : (
          <PlaceholderNavLink key={link.label} Icon={link.icon}>
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
