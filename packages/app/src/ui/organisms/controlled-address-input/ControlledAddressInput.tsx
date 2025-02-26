import { Control, Controller, useFormContext } from 'react-hook-form'
import { AddressInput } from '@/ui/molecules/address-input/AddressInput'

interface ControlledAddressInputProps {
  fieldName: string
  control: Control<any>
  onRemove?: () => void
  disabled?: boolean
  showError?: boolean
}

export function ControlledAddressInput({
  fieldName,
  control,
  disabled,
  onRemove,
  showError,
}: ControlledAddressInputProps) {
  const { trigger } = useFormContext()

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState: { error, isTouched, isDirty } }) => {
        showError = showError ?? (isTouched || isDirty)

        return (
          <AddressInput
            {...field}
            onRemove={onRemove}
            error={showError ? error?.message : undefined}
            disabled={disabled}
            autoComplete="off"
            onChange={(e) => {
              field.onChange(e)
              // always trigger validation of the whole form
              trigger().catch(console.error)
            }}
          />
        )
      }}
    />
  )
}
