type AppData = {
  COPYRIGHT: string
  NAME: string
  SHORT_NAME: string
}

type LegalEntityData = {
  ADDRESS?: string
  NAME: string
}
type AppTerms = {
  LEGAL_ENTITIES: LegalEntityData[]
  ONLINE_PROPERTIES: OnlineProperty[]
  PRIVACY_EMAIL: string
  TOKENS: string[]
  UPDATED_AT: string
}
type OnlineProperty = {
  href: string
  name: string
}

// Application

export const TITLE = 'Astaria'
export const DESCRIPTION = 'Mission: Instant liquidity for any on-chain asset.'

export const BASE_URL = 'https://astaria.xyz'

export const APP_DATA: AppData = {
  COPYRIGHT: `© ${new Date().getFullYear()} Astaria Labs, Inc.`,
  NAME: TITLE,
  SHORT_NAME: TITLE,
}

// Terms & Privacy
export const APP_TERMS: AppTerms = {
  LEGAL_ENTITIES: [
    {
      ADDRESS: '1999 Bryan St. Suite 900 Dallas TX 75201-3136',
      NAME: 'Astaria Labs, Inc.',
    },
  ],
  ONLINE_PROPERTIES: [{ href: BASE_URL, name: 'Astaria.xyz' }],
  PRIVACY_EMAIL: 'privacy@astaria.xyz',
  TOKENS: [],
  UPDATED_AT: 'Nov 1, 2022',
}

// Misc

export const STORAGE_KEY: 'astaria' = 'astaria' as const
export const ACCEPT_TERMS_LOCAL_STORAGE_KEY = `${STORAGE_KEY}.terms`
