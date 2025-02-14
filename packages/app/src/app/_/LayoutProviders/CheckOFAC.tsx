'use client'

import { type ReactNode } from 'react'

import { useAccount } from 'wagmi'

import { EVENT } from 'notifications'

import { RestrictedPage } from '@/astaria/components/RestrictedPage'
import { trackInternalEvent } from '@/astaria/utils/trackInternalEvent'

import { OFAC_BLACKLIST } from 'ofac'

export const CheckOFAC = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount()

  if (address && OFAC_BLACKLIST.includes(address)) {
    trackInternalEvent({
      name: EVENT.ACCOUNT_BLACKLIST_REJECT,
      payload: {
        description: `OFAC Sanctioned address ${address} blocked from application.`,
        title: 'OFAC Wallet Blacklist',
        values: {
          account: address as string,
        },
      },
    })

    return <RestrictedPage address={address} />
  }

  return children
}
