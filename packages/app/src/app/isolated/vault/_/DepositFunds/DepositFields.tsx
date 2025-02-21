import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { USDValue } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValue'
import { type DepositFundsFormSchema } from '@/app/isolated/vault/_/DepositFunds/depositFundsFormSchema'
import { AssetSelectorValueSelectWrapper } from '@/astaria/components/AssetSelector/AssetSelectorValueSelectWrapper'
import { ERC20Selector } from '@/astaria/components/AssetSelector/ERC20Selector'
import { BigIntInput } from '@/astaria/components/BigIntInput'
import { CardSection } from '@/astaria/components/Card'
import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/astaria/components/Dialog'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/astaria/components/Form'
import { SelectDialogButton } from '@/astaria/components/SelectDialogButton'

const DepositInput = () => {
  const { control } = useFormContext<DepositFundsFormSchema>()

  const depositAmount = useWatch({
    control,
    name: 'depositAmount',
  })
  const depositAsset = useWatch({
    control,
    name: 'depositAsset',
  })

  return (
    <FormField
      control={control}
      name="depositAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount to deposit</FormLabel>
          <FormControl>
            <BigIntInput {...field} decimals={depositAsset.decimals} emphasis="low" placeholder="0" textSize="3xl" />
          </FormControl>
          <FormMessage>
            <USDValue amount={depositAmount} asset={depositAsset} className="text-xs font-medium" />
          </FormMessage>
        </FormItem>
      )}
    />
  )
}

const DepositAsset = () => {
  const { clearErrors, control, setValue } = useFormContext<DepositFundsFormSchema>()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <FormField
      control={control}
      name="depositAsset"
      render={({ field }) => (
        <FormItem>
          <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger asChild>
              <SelectDialogButton disabled id="deposit-asset-button">
                {field.value ? (
                  <div className="flex min-w-0 items-center gap-1">
                    <ERC20Image erc20={field.value} size="sm" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">{field.value.symbol}</span>
                  </div>
                ) : (
                  'Token'
                )}
              </SelectDialogButton>
            </DialogTrigger>
            <DialogContainer>
              <DialogHeader>
                <DialogTitle>Select an asset to deposit</DialogTitle>
              </DialogHeader>
              <DialogContent>
                <ERC20Selector
                  asset={field.value}
                  setAsset={(value) => {
                    setValue('depositAsset', value)
                    clearErrors('depositAsset')
                  }}
                  setDialogOpen={setDialogOpen}
                  type="deposit"
                />
              </DialogContent>
            </DialogContainer>
          </Dialog>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const DepositFields = () => (
  <CardSection>
    <AssetSelectorValueSelectWrapper>
      <DepositInput />
      <div>
        <div className="h-6" />
        <DepositAsset />
      </div>
    </AssetSelectorValueSelectWrapper>
  </CardSection>
)
