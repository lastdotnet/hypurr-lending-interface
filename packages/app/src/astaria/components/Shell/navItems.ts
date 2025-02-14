import { ROUTES } from '@/astaria/constants/routes'

type NavItem = {
  children?: NavItem[]
  href: string
  label: string
}
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { href: ROUTES.INTENTS, label: 'Intents' },
  { href: ROUTES.LOANS, label: 'My loans' },
  { href: ROUTES.MARKETS, label: 'Markets' },
  { href: ROUTES.POINTS_LEADERBOARD, label: 'Points' },
]
