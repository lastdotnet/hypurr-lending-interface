import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { clsx } from 'clsx'

import { addOrRemoveDecimals } from 'common'

import { IntentSuggestions } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/IntentSuggestions'
import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { BalanceAndMaxSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/BalanceAndMaxSection'
import { USDValue } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValue'
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
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { SelectDialogButton } from '@/astaria/components/SelectDialogButton'

type Copy = { dialogTitle: string; inputLabel: string; tooltip?: string }

const BorrowInput = ({ copy }: { copy: Copy }) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()
  const borrowAmount = useWatch({
    control,
    name: 'borrowAmount',
  })
  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })

  return (
    <FormField
      control={control}
      name="borrowAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="-mr-16">
            {copy.inputLabel}
            {copy.tooltip ? (
              <>
                {' '}
                <Popover>
                  <PopoverInfoTrigger />
                  <PopoverContent>{copy.tooltip}</PopoverContent>
                </Popover>
              </>
            ) : null}
          </FormLabel>
          <FormControl>
            <BigIntInput {...field} decimals={borrowAsset.decimals} emphasis="low" placeholder="0" textSize="3xl" />
          </FormControl>
          <FormMessage>
            <USDValue amount={borrowAmount} asset={borrowAsset} className="font-medium text-xs" />
          </FormMessage>
        </FormItem>
      )}
    />
  )
}

const BorrowAsset = ({ copy }: { copy: Copy }) => {
  const { clearErrors, control, setValue, trigger } = useFormContext<BorrowIntentFormSchema>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const borrowAmount = useWatch({
    control,
    name: 'borrowAmount',
  })
  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })

  return (
    <FormField
      control={control}
      name="borrowAsset"
      render={({ field }) => (
        <FormItem>
          <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger asChild>
              <SelectDialogButton id="borrow-asset-button">
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
                <DialogTitle>{copy.dialogTitle}</DialogTitle>
              </DialogHeader>
              <DialogContent>
                <ERC20Selector
                  asset={field.value}
                  setAsset={(value) => {
                    setValue('borrowAsset', value)
                    clearErrors('borrowAsset')
                    if (value !== borrowAsset) {
                      setValue(
                        'borrowAmount',
                        addOrRemoveDecimals({
                          newDecimals: value.decimals,
                          oldDecimals: borrowAsset.decimals,
                          value: borrowAmount,
                        }),
                      )
                      trigger('borrowAmount') // trigger validation
                    }
                  }}
                  setDialogOpen={setDialogOpen}
                  type="borrow"
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

export const BorrowSection = ({
  className,
  copy,
  type,
}: {
  className?: string
  copy: Copy
  type: 'borrow' | 'lend'
}) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()

  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })

  return (
    <CardSection className={className}>
      <AssetSelectorValueSelectWrapper>
        <BorrowInput copy={copy} />
        <div className="flex flex-col items-end">
          <div
            className={clsx({
              'h-6': type === 'lend',
              'h-9': type === 'borrow',
            })}
          />
          <BorrowAsset copy={copy} />
          {type === 'lend' ? <BalanceAndMaxSection amountFieldName="borrowAmount" asset={borrowAsset} /> : null}
        </div>
      </AssetSelectorValueSelectWrapper>
      {type === 'lend' ? <IntentSuggestions type={type} /> : null}
    </CardSection>
  )
}
