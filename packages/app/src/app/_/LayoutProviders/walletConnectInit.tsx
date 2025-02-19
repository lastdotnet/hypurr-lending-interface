import { initWeb3InboxClient } from '@web3inbox/react'

import { ENV } from '@/astaria/constants/environment'

initWeb3InboxClient({
  domain: ENV.NEXT_PUBLIC_APP_DOMAIN,
  projectId: ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
})
