import { Control } from 'react-hook-form'

import { TokenWithBalance } from '@/domain/common/types'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { testIds } from '@/ui/utils/testIds'

import { AssetSelectorWithInput } from '../asset-selector-with-input/AssetSelectorWithInput'

export interface MultiAssetSelectorProps {
  fieldName: string
  selectedAssets: TokenWithBalance[]
  allAssets: TokenWithBalance[]
  assetToMaxValue: Record<TokenSymbol, NormalizedUnitNumber>
  removeAsset: (index: number) => void
  changeAsset: (index: number, newAssetSymbol: TokenSymbol) => void
  control: Control<any>
  disabled?: boolean
  showError?: boolean
  maxSelectedFieldName?: string
  resetBorrowStatus?: () => void
}

export function MultiAssetSelector({
  fieldName,
  selectedAssets,
  allAssets,
  assetToMaxValue,
  removeAsset,
  changeAsset,
  control,
  disabled,
  showError,
  maxSelectedFieldName,
  resetBorrowStatus,
}: MultiAssetSelectorProps) {
  return (
    <div>
      {selectedAssets.map((asset, index) => {
        return (
          <div key={asset.token.symbol} className="mt-2" data-testid={testIds.component.MultiAssetSelector.group}>
            <AssetSelectorWithInput
              fieldName={`${fieldName}.${index}.value`}
              control={control}
              selectorAssets={allAssets.filter((s) => !selectedAssets.some((a) => a.token.symbol === s.token.symbol))}
              selectedAsset={asset}
              setSelectedAsset={(newAsset) => changeAsset(index, newAsset)}
              removeSelectedAsset={selectedAssets.length > 1 ? () => removeAsset(index) : undefined}
              maxValue={assetToMaxValue[asset.token.symbol]}
              disabled={disabled}
              showError={showError}
              maxSelectedFieldName={maxSelectedFieldName && `${fieldName}.${index}.${maxSelectedFieldName}`}
              resetBorrowStatus={resetBorrowStatus}
            />
          </div>
        )
      })}
    </div>
  )
}
