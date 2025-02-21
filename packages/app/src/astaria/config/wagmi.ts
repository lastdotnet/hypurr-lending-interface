import { SUPPORTED_CHAINS } from '@/astaria/constants/chains'
import { transports } from '@/astaria/constants/transports'
import { cookieStorage, createConfig, createStorage } from 'wagmi'

export const wagmiConfig = createConfig({
  chains: SUPPORTED_CHAINS,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports,
})
