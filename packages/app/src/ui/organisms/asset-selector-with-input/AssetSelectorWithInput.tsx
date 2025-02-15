import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { TokenWithBalance } from '@/domain/common/types'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { AssetInputProps } from '@/ui/molecules/asset-input/AssetInput'
import { cn } from '@/ui/utils/style'

import { raise } from '@/utils/assert'
import { AssetSelector } from '../../molecules/asset-selector/AssetSelector'
import { ControlledMultiSelectorAssetInput } from '../multi-selector/ControlledMultiSelectorAssetInput'

export interface AssetSelectorWithInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  fieldName: FieldPath<TFieldValues>
  selectorAssets: TokenWithBalance[]
  selectedAsset: TokenWithBalance
  setSelectedAsset?: (selectedAsset: TokenSymbol) => void
  maxValue?: NormalizedUnitNumber
  maxSelectedFieldName?: string
  removeSelectedAsset?: () => void
  disabled?: boolean
  showError?: boolean // defaults to show error if field is touched or dirty
  className?: string
  variant?: AssetInputProps['variant']
  walletIconLabel?: string
  resetBorrowStatus?: () => void
}

export function AssetSelectorWithInput<TFieldValues extends FieldValues>({
  control,
  fieldName,
  selectorAssets,
  selectedAsset,
  setSelectedAsset,
  maxValue,
  removeSelectedAsset,
  disabled,
  showError,
  className,
  variant,
  walletIconLabel,
  maxSelectedFieldName,
  resetBorrowStatus,
}: AssetSelectorWithInputProps<TFieldValues>) {
  if (selectorAssets.length > 1 && !setSelectedAsset) {
    raise('When more than one option to choose from, asset selection setter must be provided')
  }
  return (
    <div className={cn('flex w-full flex-row justify-between gap-2', className)}>
      <AssetSelector
        assets={selectorAssets}
        selectedAsset={selectedAsset.token}
        setSelectedAsset={(newAsset) => setSelectedAsset?.(newAsset)}
        disabled={disabled}
        resetBorrowStatus={resetBorrowStatus}
      />
      <ControlledMultiSelectorAssetInput
        fieldName={fieldName}
        control={control}
        disabled={disabled}
        token={selectedAsset.token}
        onRemove={removeSelectedAsset}
        balance={selectedAsset.balance}
        max={maxValue}
        maxSelectedFieldName={maxSelectedFieldName}
        showError={showError}
        variant={variant}
        walletIconLabel={walletIconLabel}
        resetBorrowStatus={resetBorrowStatus}
      />
    </div>
  )
}
