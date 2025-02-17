import { formFormat } from '@/domain/common/format'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { AssetInput, AssetInputProps } from '@/ui/molecules/asset-input/AssetInput'
import { Control, Controller, useFormContext } from 'react-hook-form'

interface ControlledMultiSelectorAssetInputProps {
  fieldName: string
  control: Control<any>
  token: Token
  max?: NormalizedUnitNumber
  maxSelectedFieldName?: string
  onRemove?: () => void
  balance?: NormalizedUnitNumber
  disabled?: boolean
  showError?: boolean // defaults to show error if field is touched or dirty
  variant?: AssetInputProps['variant']
  walletIconLabel?: string
  resetBorrowStatus?: () => void
}

export function ControlledMultiSelectorAssetInput({
  fieldName,
  control,
  disabled,
  token,
  onRemove,
  balance,
  max,
  maxSelectedFieldName,
  showError,
  variant,
  walletIconLabel,
  resetBorrowStatus,
}: ControlledMultiSelectorAssetInputProps) {
  const { setValue, trigger, getValues } = useFormContext()

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState: { error, isTouched, isDirty } }) => {
        showError = showError ?? (isTouched || isDirty)
        const isMaxSelected = maxSelectedFieldName ? getValues(maxSelectedFieldName) : false

        function toggleIsMaxSelected() {
          if (maxSelectedFieldName) {
            setValue(maxSelectedFieldName, !isMaxSelected, {
              shouldValidate: true,
            })
          }
        }

        const setMaxValue = max?.gt(0)
          ? () => {
              setValue(fieldName, formFormat(max, token.decimals), {
                shouldValidate: true,
              })
              toggleIsMaxSelected()
            }
          : undefined

        return (
          <AssetInput
            {...field}
            token={token}
            onRemove={onRemove}
            balance={balance}
            error={showError ? error?.message : undefined}
            disabled={disabled && !resetBorrowStatus}
            variant={variant}
            walletIconLabel={walletIconLabel}
            setMax={setMaxValue}
            isMaxSelected={isMaxSelected}
            autoComplete="off"
            onChange={(e) => {
              field.onChange(e)
              if (disabled) {
                resetBorrowStatus?.()
              }
              if (maxSelectedFieldName) {
                setValue(maxSelectedFieldName, false, {
                  shouldValidate: true,
                })
              }
              // always trigger validation of the whole form
              trigger().catch(console.error)
            }}
          />
        )
      }}
    />
  )
}
