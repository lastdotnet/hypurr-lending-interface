'use client'

import { type ReactNode } from 'react'

import { EVENT } from 'notifications'

import { RestrictedPage } from '@/astaria/components/RestrictedPage'
import { trackInternalEvent } from '@/astaria/utils/trackInternalEvent'

import { OFAC_BLACKLIST } from 'ofac'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

export const CheckOFAC = ({ children }: { children: ReactNode }) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

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
