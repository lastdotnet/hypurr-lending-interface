'use client'

import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { usePageChainId } from '@/domain/hooks/usePageChainId'
import { useBannerVisibility } from '@/domain/state/bannersVisibility'
import { Navbar } from '@/features/navbar/Navbar'
import { cn } from '@/ui/utils/style'
import { TOP_BANNER_ID, TopBanner } from '../../atoms/top-banner/TopBanner'
import { PageNotSupportedWarning } from './components/PageNotSupportedWarning'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { hyperTestnet } from '@/config/chain/constants'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true)
  const { pageSupported, pageName } = usePageChainId()
  const { primaryWallet, network } = useDynamicContext()
  const { handleCloseBanner, showBanner } = useBannerVisibility(TOP_BANNER_ID)
  const isWrongNetwork = primaryWallet?.connector.supportsNetworkSwitching() && network && network !== hyperTestnet.id

  return (
    <div className={cn('flex min-h-screen flex-col')}>
      {process.env.NEXT_PUBLIC_FEATURE_TOP_BANNER === '1' && showBanner && <TopBanner onClose={handleCloseBanner} />}
      <Navbar
        mobileMenuCollapsed={mobileMenuCollapsed}
        setMobileMenuCollapsed={setMobileMenuCollapsed}
        className="z-20"
      />
      <main className={cx('isolate flex w-full grow flex-col', !mobileMenuCollapsed && 'hidden xl:flex')}>
        {children}
        {(!pageSupported || isWrongNetwork) &&
          createPortal(
            <PageNotSupportedWarning
              pageName={pageName}
              openNetworkSelectDialog={() => primaryWallet?.switchNetwork(hyperTestnet.id)}
              className="z-[1000]"
            />,
            document.body,
          )}
      </main>
    </div>
  )
}
