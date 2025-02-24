import { msg } from '@lingui/core/macro'

export const eModeCategoryIdToName = {
  0: 'No E-Mode',
  1: 'ETH Correlated',
  2: 'Stablecoins',
} as const

export const eModeCategoryIdToTranslation = {
  0: msg`No E-Mode`,
  1: msg`ETH Correlated`,
  2: msg`Stablecoins`,
} as const
