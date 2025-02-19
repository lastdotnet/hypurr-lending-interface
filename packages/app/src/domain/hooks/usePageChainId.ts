'use client'

import { getChainConfigEntry } from '@/config/chain'
import { hyperTestnet } from '@/config/chain/constants'
import { Path, getSupportedPages, paths } from '@/config/paths'
import { usePathname } from 'next/navigation'
import { base } from 'viem/chains'
import { useChainId } from 'wagmi'

export interface UsePageChainIdResult {
  chainId: number
  pageSupported: boolean
  pageName: string
}

export function usePageChainId(): UsePageChainIdResult {
  const chainId = useChainId()
  const pathname = usePathname()
  const supportedPages = getSupportedPages(getChainConfigEntry(chainId))

  type SupportedPage = (typeof supportedPages)[number]

  const currentPage = Object.entries(paths).find(([_, path]) => pathname?.startsWith(path))?.[0]
  const pageName = pageNamesMap[currentPage as Path]

  if (!currentPage) {
    return { chainId, pageSupported: true, pageName: '' }
  }

  if (base.id === chainId) {
    return { chainId, pageSupported: true, pageName: pageName || '' }
  }

  if (supportedPages.includes(currentPage as SupportedPage)) {
    return { chainId, pageSupported: true, pageName }
  }

  return { chainId: hyperTestnet.id, pageSupported: false, pageName }
}

const pageNamesMap: Record<Path, string> = {
  easyBorrow: 'Easy Borrow',
  dashboard: 'Dashboard',
  markets: 'Markets',
  marketDetails: 'Market',
  savings: 'Savings',
  farms: 'Farms',
  farmDetails: 'Farm',
  faucet: 'Faucet',
}
