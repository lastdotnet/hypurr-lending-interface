import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

export const supportedChains = {
  development: [base, mode, mainnet, sepolia, foundry] as const, // order matters
  preview: [base, mode, mainnet, sepolia] as const, // order matters
  production: [base, mode, mainnet, sepolia] as const, // order matters
} as const

export const defaultChain = {
  development: base,
  preview: base,
  production: base,
} as const
