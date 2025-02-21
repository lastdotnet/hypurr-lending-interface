import { IconCoins } from '@tabler/icons-react'

export const pointsStaticData = {
  borrow: {
    details: ['The more you borrow, the more points you earn.'],
    howToEarnText: 'Borrow USDC or WETH',
    icon: <IconCoins className="shrink-0" />,
    type: 'borrow',
  },
  lend: {
    details: ['The more you lend, the more points you earn.'],
    howToEarnText: 'Lend USDC or WETH',
    icon: <IconCoins className="shrink-0" />,
    type: 'lend',
  },
}
