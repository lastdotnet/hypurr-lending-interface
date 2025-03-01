import { Control } from 'react-hook-form'

import { TokenWithBalance } from '@/domain/common/types'
import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { Typography } from '@/ui/atoms/typography/Typography'
import { MultiAssetSelector } from '@/ui/organisms/multi-selector/MultiSelector'
import { testIds } from '@/ui/utils/testIds'

import { paths } from '@/config/paths'
import { Link } from '@/ui/atoms/link/Link'
import { Info } from '@/ui/molecules/info/Info'
import { EasyBorrowFormSchema } from '../../logic/form/validation'
import { ExistingPosition } from '../../logic/types'
import { formatPercentage } from '@/domain/common/format'
import { TokenSummary } from './TokenSummary'

export interface DepositsProps {
  selectedAssets: TokenWithBalance[]
  allAssets: TokenWithBalance[]
  assetToMaxValue: Record<TokenSymbol, NormalizedUnitNumber>
  addAsset: () => void
  removeAsset: (index: number) => void
  changeAsset: (index: number, newAssetSymbol: TokenSymbol) => void
  alreadyDeposited: ExistingPosition
  control: Control<EasyBorrowFormSchema>
  maxSelectedFieldName?: string
  disabled?: boolean
  resetBorrowStatus?: () => void
  depositAPY: Percentage
}

export function Deposits(props: DepositsProps) {
  const { alreadyDeposited, depositAPY } = props

  return (
    <div className="flex flex-1 flex-col" data-testid={testIds.easyBorrow.form.deposits}>
      <div className="flex h-10 flex-row items-center justify-between">
        <div className="flex flex-row gap-1">
          <Typography variant="h4">Deposit</Typography>
          <Info>
            Some assets (e.g., isolated assets) are only accessible via the{' '}
            <Link href={paths.dashboard}>Dashboard</Link> at this time.
          </Info>
        </div>
        <Typography>
          <span className="mr-1 text-white/50">APY</span> {formatPercentage(depositAPY)}
        </Typography>
      </div>

      {alreadyDeposited.tokens.length > 0 && <TokenSummary position={alreadyDeposited} type="deposit" />}

      <MultiAssetSelector fieldName="assetsToDeposit" {...props} />
    </div>
  )
}
