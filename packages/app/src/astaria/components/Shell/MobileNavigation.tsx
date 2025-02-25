'use client'

import { IconMenuDeep, IconX } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/astaria/components/Button'
import { PushApiConnector } from '@/astaria/components/PushApiConnector'
import { Sheet, SheetContent, SheetTrigger } from '@/astaria/components/Sheet'
import { NavButton } from '@/astaria/components/Shell/NavButton'
import { PointsButton } from '@/astaria/components/Shell/PointsButton'
import { WalletNotificationButton } from '@/astaria/components/Shell/WalletNotificationButton'
import { PRIMARY_NAV_ITEMS } from '@/astaria/components/Shell/navItems'

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger asChild>
          <Button className="shrink-0 sm:hidden" emphasis="low" size="icon">
            {isOpen ? (
              <IconX aria-label="Close navigation menu" />
            ) : (
              <IconMenuDeep aria-label="Open navigation menu" className="-scale-x-100" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-x-hidden" mobileNav side="left">
          <div className="flex flex-col">
            {PRIMARY_NAV_ITEMS?.map(({ href, label }) => (
              <NavButton
                key={href}
                className="-mx-px -mt-px w-full-bleed-px focus-visible:z-[100]"
                fullWidth
                href={href}
                isInMobileNavigation
                setIsOpen={setIsOpen}
              >
                {label}
              </NavButton>
            ))}
          </div>
          <div>
            <PointsButton
              className="-mx-px -mt-px w-full-bleed-px border-b"
              emphasis="medium"
              fullWidth
              isInMobileNavigation
            />
          </div>
          <div>
            <WalletNotificationButton
              className="-mx-px -mt-px w-full-bleed-px border-b"
              emphasis="medium"
              fullWidth
              isInMobileNavigation
            />
          </div>
        </SheetContent>
      </Sheet>
      <PushApiConnector isOpen={isOpen} />
    </>
  )
}
