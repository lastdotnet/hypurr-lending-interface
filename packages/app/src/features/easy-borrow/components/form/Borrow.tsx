import { TokenWithBalance } from '@/domain/common/types'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { Typography } from '@/ui/atoms/typography/Typography'
import { AssetSelector } from '@/ui/molecules/asset-selector/AssetSelector'
import { ControlledMultiSelectorAssetInput } from '@/ui/organisms/multi-selector/ControlledMultiSelectorAssetInput'
import { testIds } from '@/ui/utils/testIds'
import { raise } from '@/utils/assert'
import { Control } from 'react-hook-form'
import { EasyBorrowFormSchema } from '../../logic/form/validation'
import { ExistingPosition } from '../../logic/types'
import { Percentage } from '@/domain/types/NumericValues'
import { formatPercentage } from '@/domain/common/format'
import { TokenSummary } from './TokenSummary'
import { Trans } from '@lingui/react/macro'

interface BorrowProps {
  selectedAssets: TokenWithBalance[]
  allAssets: TokenWithBalance[]
  changeAsset: (index: number, newSymbol: TokenSymbol) => void
  alreadyBorrowed: ExistingPosition
  control: Control<EasyBorrowFormSchema>
  disabled: boolean
  resetBorrowStatus?: () => void
  borrowAPY: Percentage
}

export function Borrow(props: BorrowProps) {
  const { selectedAssets, allAssets, changeAsset, control, disabled, resetBorrowStatus, borrowAPY, alreadyBorrowed } =
    props
  const { token } = selectedAssets[0] ?? raise('No borrow token selected')

  return (
    <div data-testid={testIds.easyBorrow.form.borrow} className="flex flex-1 flex-col">
      <div className="flex h-10 flex-row items-center justify-between">
        <Typography variant="h4" className="flex h-10 items-center">
          <Trans>Borrow</Trans>
        </Typography>

        <Typography>
          <span className="mr-1 text-white/50">
            <Trans>APY</Trans>
          </span>{' '}
          {formatPercentage(borrowAPY)}
        </Typography>
      </div>

      {alreadyBorrowed.tokens.length > 0 && <TokenSummary position={alreadyBorrowed} type="borrow" />}

      <div className="mt-2 flex flex-row items-start gap-2">
        <AssetSelector
          assets={allAssets}
          selectedAsset={token}
          setSelectedAsset={(newAsset) => changeAsset(0, newAsset)}
          disabled={disabled}
          resetBorrowStatus={resetBorrowStatus}
        />
        <ControlledMultiSelectorAssetInput
          fieldName="assetsToBorrow.0.value"
          control={control}
          disabled={disabled}
          token={token}
          resetBorrowStatus={resetBorrowStatus}
        />
      </div>
    </div>
  )
}
