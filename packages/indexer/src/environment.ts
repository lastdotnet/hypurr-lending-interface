import { z } from 'zod'

const ENV_SCHEMA = z.object({
  FORK_URL: z.string().optional(),
  RAILWAY_ENVIRONMENT_NAME: z.enum(['preview', 'production', 'development']).default('production'),
  WALLET_CONNECT_ID: z.string(),
  WALLET_CONNECT_SECRET: z.string(),
})

const RPC_URLS_SCHEMA = z.object({
  RPC_URL_BASE: z.string(),
  RPC_URL_BLAST: z.string(),
  RPC_URL_FOUNDRY: z.string().optional(),
  RPC_URL_MAINNET: z.string(),
  RPC_URL_MODE: z.string(),
  RPC_URL_SEPOLIA: z.string(),
})

const INPUT_SCHEMA = ENV_SCHEMA.merge(RPC_URLS_SCHEMA.partial())

const DYNAMIC_ENV_SCHEMA = INPUT_SCHEMA.superRefine((val) => {
  if (val.RAILWAY_ENVIRONMENT_NAME !== 'development') {
    ENV_SCHEMA.parse(val)
  }
  return true
})

export const ENV = DYNAMIC_ENV_SCHEMA.parse(process.env)
