import { ROUTES } from '@/astaria/constants/routes'
import { BarChartIcon, CreditCardIcon, type LucideIcon, MessageSquareIcon, TrophyIcon } from 'lucide-react'

type NavItem = {
  children?: NavItem[]
  href: string
  label: string
  icon?: LucideIcon
}
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { href: ROUTES.INTENTS, label: 'Intents', icon: MessageSquareIcon },
  { href: ROUTES.LOANS, label: 'My loans', icon: CreditCardIcon },
  { href: ROUTES.MARKETS, label: 'Markets', icon: BarChartIcon },
  { href: ROUTES.POINTS_LEADERBOARD, label: 'Points', icon: TrophyIcon },
]
