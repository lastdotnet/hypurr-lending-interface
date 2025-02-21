import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { assets } from '@/ui/assets'
import { Tile, TileProps } from './components/Tile'
import { msg } from '@lingui/core/macro'

interface SummaryTileProps {
  variant: 'total-market-size' | 'total-value-locked' | 'total-available' | 'total-borrows'
  USDValue: NormalizedUnitNumber
  'data-testid'?: string
}

export function SummaryTile({ variant, USDValue, 'data-testid': dataTestId }: SummaryTileProps) {
  return <Tile USDValue={USDValue} {...tileProps[variant]} data-testid={dataTestId} />
}

const tileProps: Record<SummaryTileProps['variant'], Omit<TileProps, 'USDValue' | 'index'>> = {
  'total-market-size': {
    icon: assets.markets.chart,
    title: msg`Total market size`,
  },
  'total-value-locked': {
    icon: assets.markets.lock,
    title: msg`Total value locked`,
  },
  'total-available': {
    icon: assets.markets.inputOutput,
    title: msg`Total available`,
  },
  'total-borrows': {
    icon: assets.markets.output,
    title: msg`Total borrows`,
  },
}
