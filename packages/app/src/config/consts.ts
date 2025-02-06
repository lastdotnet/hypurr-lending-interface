import { CheckedAddress } from '@/domain/types/CheckedAddress'

export enum InterestRate {
  Stable = 1,
  Variable = 2,
}

export const NATIVE_ASSET_MOCK_ADDRESS = CheckedAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')

export const MAX_INT = BigInt(2 ** 256 - 1)

export const ZUSTAND_APP_STORE_LOCAL_STORAGE_KEY = 'zustand-app-store'
export const ZUSTAND_APP_STORE_LOCAL_STORAGE_VERSION = 2

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '/api'
export const blockAnaliticaApiUrl = process.env.NEXT_PUBLIC_BLOCK_ANALITICA_API_URL ?? '/ba-api'
export const infoSkyApiUrl = process.env.NEXT_PUBLIC_INFO_SKY_API_URL ?? '/info-sky-api'
export const faucetUrl = process.env.NEXT_PUBLIC_FAUCET_URL ?? '/claim-with-gas'
export const twitterFollowUrl = process.env.NEXT_PUBLIC_TWITTER_FOLLOW_URL ?? '/verify-follow'

// @note: all sandboxes created by the app begin (when expressed as strings) with this chain id. Ex: 30301719211032
export const SANDBOX_NETWORKS_CHAIN_ID_PREFIX = 3030

export const HYPURR_UI_REFERRAL_CODE = 0 // 0x0
export const HYPURR_UI_REFERRAL_CODE_BIGINT = BigInt(HYPURR_UI_REFERRAL_CODE)

export const USDXL_ADDRESS = CheckedAddress('0xfc446B60a054703A9DC096dd397a6e3cdd614275')
export const A_USDXL_ADDRESS = CheckedAddress('0xCFBD3c2c0Be381A02fbca18eA8a2231d7C2dE116')
