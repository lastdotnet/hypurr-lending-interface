import { defaultChain, supportedChains } from 'chains'

import { ENV } from '@/astaria/constants/environment'

export const SUPPORTED_CHAINS = supportedChains[ENV.NEXT_PUBLIC_VERCEL_ENV]

export const DEFAULT_CHAIN = defaultChain[ENV.NEXT_PUBLIC_VERCEL_ENV]
