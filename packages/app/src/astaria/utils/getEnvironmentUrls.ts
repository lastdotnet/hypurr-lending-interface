import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import { ENV_SERVER } from '@/astaria/constants/environmentServer'

const RPCUrlLookup = {
  [base.id]: ENV_SERVER.RPC_URL_BASE,
  [foundry.id]: ENV_SERVER.RPC_URL_FOUNDRY,
  [mainnet.id]: ENV_SERVER.RPC_URL_MAINNET,
  [mode.id]: ENV_SERVER.RPC_URL_MODE,
  [sepolia.id]: ENV_SERVER.RPC_URL_SEPOLIA,
}

export const getRPCUrl = (chainId: ChainId) => {
  const rpcUrl = RPCUrlLookup[chainId]
  if (rpcUrl) {
    return rpcUrl
  }
  throw new Error(`RPC_URL not configured for ${chainId}`)
}
