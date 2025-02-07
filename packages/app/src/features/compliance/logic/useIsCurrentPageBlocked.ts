import { usePathname } from 'next/navigation'
import { paths } from '@/config/paths'

import { useBlockedPages } from './useBlockedPages'

export function useIsCurrentPageBlocked(): boolean {
  const blockedPages = useBlockedPages()
  const pathname = usePathname()

  for (const blockedPage of blockedPages) {
    if (pathname === paths[blockedPage]) {
      return true
    }
  }

  return false
}
