import { getConfig as getDefaultConfig } from './config.default'
import { getMockConfig } from './config.e2e'

// @note: even in devmode we try to use mock config (which enables running e2e tests) but if we detect that it's not configured properly (inside getMockConfig)
// it will fallback to default config.
export const getConfig =
  process.env.NEXT_PUBLIC_PLAYWRIGHT === '1' || process.env.MODE === 'development' ? getMockConfig : getDefaultConfig
