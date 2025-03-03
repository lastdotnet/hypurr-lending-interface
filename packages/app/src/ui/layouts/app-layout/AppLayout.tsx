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
import { hyperEVM, hyperTestnet } from '@/config/chain/constants'
import { InkeepFloatingButton } from '@/ui/atoms/inkeep/InkeepFloatingButton'
import { useWrongNetwork } from '@/domain/hooks/useWrongNetwork'
import { isTestnet } from '@/config/consts'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuCollapsed, setMobileMenuCollapsed] = useState(true)
  const { pageSupported, pageName } = usePageChainId()
  const { primaryWallet } = useDynamicContext()
  const isWrongNetwork = useWrongNetwork()
  const { handleCloseBanner, showBanner } = useBannerVisibility(TOP_BANNER_ID)

  return (
    <div className={cn('flex min-h-screen flex-col')}>
      {showBanner && <TopBanner onClose={handleCloseBanner} />}

      <div className="flex flex-col xl:flex-row">
        <div className="no-scrollbar top-0 bottom-0 z-50 flex overflow-y-scroll border-white/5 xl:fixed xl:w-52 xl:border-r">
          <Navbar
            mobileMenuCollapsed={mobileMenuCollapsed}
            setMobileMenuCollapsed={setMobileMenuCollapsed}
            showBanner={showBanner}
          />
        </div>

        <main
          className={cx(
            'isolate flex w-full grow flex-col 3xl:ml-0 xl:ml-52 xl:px-4',
            !mobileMenuCollapsed && 'hidden xl:flex',
          )}
        >
          {children}
          {(!pageSupported || isWrongNetwork) &&
            createPortal(
              <PageNotSupportedWarning
                pageName={pageName}
                openNetworkSelectDialog={() => primaryWallet?.switchNetwork(isTestnet ? hyperTestnet.id : hyperEVM.id)}
                className="z-[1000]"
              />,
              document.body,
            )}
        </main>
      </div>
      <InkeepFloatingButton />
    </div>
  )
}
