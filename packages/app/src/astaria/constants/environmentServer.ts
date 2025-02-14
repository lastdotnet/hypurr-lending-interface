import * as process from 'node:process'
import { cleanEnv, str } from 'envalid'

export const ENV_SERVER = cleanEnv(
  {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.REDIS_URL,
    RPC_URL_BASE: process.env.RPC_URL_BASE,
    RPC_URL_BLAST: process.env.RPC_URL_BLAST,
    RPC_URL_FOUNDRY: process.env.RPC_URL_FOUNDRY,
    RPC_URL_MAINNET: process.env.RPC_URL_MAINNET,
    RPC_URL_MODE: process.env.RPC_URL_MODE,
    RPC_URL_SEPOLIA: process.env.RPC_URL_SEPOLIA,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_EVENTS_CHAT_ID: process.env.TELEGRAM_EVENTS_CHAT_ID,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  {
    DB_URL: str(),
    NODE_ENV: str({ default: 'development' }),
    REDIS_URL: str({ default: '' }),
    RPC_URL_BASE: str({ default: '' }),
    RPC_URL_BLAST: str({ default: '' }),
    RPC_URL_FOUNDRY: str({ default: '' }),
    RPC_URL_MAINNET: str({ default: '' }),
    RPC_URL_MODE: str({ default: '' }),
    RPC_URL_SEPOLIA: str({ default: '' }),
    TELEGRAM_BOT_TOKEN: str({ default: '' }),
    TELEGRAM_EVENTS_CHAT_ID: str({ default: '' }),
    VERCEL_ENV: str({ default: 'development' }),
  },
)
