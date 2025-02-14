import { http } from 'viem'
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'
import { fallback } from 'wagmi'

import { ENV } from '@/astaria/constants/environment'

export const transports = {
  [base.id]: fallback([
    http(`https://base-mainnet.g.alchemy.com/v2/${ENV.NEXT_PUBLIC_ALCHEMY_ID}`),
    // http(`https://sepolia.infura.io/v3/${ENV.NEXT_PUBLIC_INFURA_ID}`), // Infura doesn't support base mainnet yet. Add support when they do. See https://docs.infura.io/api/network-endpoints#base
    http(`https://rpc.ankr.com/base/${ENV.NEXT_PUBLIC_ANKR_ID}`),
  ]),
  [foundry.id]: http(),
  [mainnet.id]: fallback([
    http(`https://eth-mainnet.g.alchemy.com/v2/${ENV.NEXT_PUBLIC_ALCHEMY_ID}`),
    http(`https://mainnet.infura.io/v3/${ENV.NEXT_PUBLIC_INFURA_ID}`),
    http(`https://rpc.ankr.com/eth/${ENV.NEXT_PUBLIC_ANKR_ID}`),
  ]),
  [mode.id]: fallback([
    http('https://mode-mainnet.blastapi.io/6f169e79-ac9c-409c-9f72-c4ee632e6b5f'),
    // http('https://1rpc.io/mode'),
  ]),
  [sepolia.id]: fallback([
    http(`https://eth-sepolia.g.alchemy.com/v2/${ENV.NEXT_PUBLIC_ALCHEMY_ID}`),
    http(`https://sepolia.infura.io/v3/${ENV.NEXT_PUBLIC_INFURA_ID}`),
    http(`https://rpc.ankr.com/eth_sepolia/${ENV.NEXT_PUBLIC_ANKR_ID}`),
  ]),
}
