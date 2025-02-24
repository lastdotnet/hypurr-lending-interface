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
import { isTestnet } from '@/config/consts'
import { useLingui } from '@lingui/react'
import { msg } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

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
    label: msg`Quick borrow`,
    icon: ArrowRightLeftIcon,
  },
  {
    to: paths.dashboard,
    label: msg`Dashboard`,
    icon: LayoutGridIcon,
  },
  {
    to: paths.markets,
    label: msg`Markets`,
    icon: BarChartIcon,
  },
  {
    label: msg`Swap`,
    icon: ArrowDownUpIcon,
  },
  {
    label: msg`Referrals`,
    icon: UserPlusIcon,
  },
  {
    label: msg`Isolated`,
    icon: MessageSquareIcon,
  },
  {
    label: msg`Staking`,
    icon: WalletCardsIcon,
  },
  ...(isTestnet
    ? [
        {
          to: paths.faucet,
          label: msg`Faucet`,
          icon: DropletIcon,
        },
      ]
    : []),
]

export function PageLinks({ mobileMenuCollapsed, closeMobileMenu }: PageLinksProps) {
  const { i18n, _ } = useLingui()
  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col items-start gap-2 pb-3 xl:gap-6 xl:pb-0',
        mobileMenuCollapsed && 'hidden xl:flex',
      )}
    >
      {links.map((link) => {
        const label = _(link.label)

        if (!link.to) {
          return (
            <PlaceholderNavLink key={label} Icon={link.icon}>
              {label}
            </PlaceholderNavLink>
          )
        }
        return (
          <NavLink key={label} to={link.to} onClick={closeMobileMenu} Icon={link.icon} locale={i18n.locale}>
            {label}
          </NavLink>
        )
      })}

      <FeedbackFish projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID || ''}>
        <button
          className={cn(
            focusVariants(),
            textVariants({ selected: false, isPlaceholder: false }),
            'flex cursor-pointer items-center gap-4 p-3 xl:p-0',
          )}
        >
          <MessageSquareIcon className="h-5 w-5" /> <Trans>Give Feedback</Trans>
        </button>
      </FeedbackFish>
    </div>
  )
}
