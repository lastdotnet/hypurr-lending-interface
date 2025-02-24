import BigNumber from 'bignumber.js'

import { EModeCategoryName } from '@/domain/e-mode/types'
import { Percentage } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { MessageDescriptor } from '@lingui/core'

export interface PositionOverview {
  healthFactor: BigNumber | undefined
  maxLTV: Percentage
}

export interface EModeCategory {
  name: EModeCategoryName
  translatedName: MessageDescriptor
  tokens: Token[]
  isSelected: boolean
  isActive: boolean
  onSelect: () => void
}
