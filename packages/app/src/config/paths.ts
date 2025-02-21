import { ChainConfigEntry } from './chain/types'

export const paths = {
  easyBorrow: '/',
  dashboard: '/dashboard',
  markets: '/markets',
  savings: '/savings',
  farms: '/farms',
  marketDetails: '/markets/:chainId/:asset',
  faucet: '/faucet',
  farmDetails: '/farms/:chainId/:address',
  isolatedMarkets: '/isolated/intents',
} as const

export type Path = keyof typeof paths

export const pathGroups = {
  borrow: ['easyBorrow', 'dashboard', 'markets', 'marketDetails'],
  savings: ['savings'],
  farms: ['farms', 'farmDetails'],
  faucet: ['faucet'],
  isolatedMarkets: ['isolatedMarkets'],
} satisfies Record<'borrow' | 'savings' | 'farms' | 'faucet' | 'isolatedMarkets', Path[]>

export function getSupportedPages(chainConfigEntry: ChainConfigEntry): Path[] {
  return [
    ...(chainConfigEntry.markets ? pathGroups.borrow : []),
    ...(chainConfigEntry.savings ? pathGroups.savings : []),
    ...(chainConfigEntry.farms ? pathGroups.farms : []),
    ...pathGroups.isolatedMarkets,
    ...pathGroups.faucet,
  ]
}
