import { IconAlertTriangleFilled, IconPencil } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { numberToPercent } from 'common'

import { type BorrowIntentFormSchema } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { AssetSelectorValueSelectWrapper } from '@/astaria/components/AssetSelector/AssetSelectorValueSelectWrapper'
import { Button } from '@/astaria/components/Button'
import { CardSection } from '@/astaria/components/Card'
import { FormField, FormItem, FormLabel, FormMessage } from '@/astaria/components/Form'
import { PercentInput } from '@/astaria/components/PercentInput'
import { Popover, PopoverContent, PopoverTrigger } from '@/astaria/components/Popover'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { Tooltip } from '@/astaria/components/Tooltip'
import { HIGH_LTV, INTENTS_LTV_MAX } from '@/astaria/constants/constants'
import { formatPercent } from '@/astaria/utils/formatPercent'
import { getBorrowAmountBasedOnLTV } from '@/astaria/utils/getBorrowAmountBasedOnLTV'
import { getLTV } from '@/astaria/utils/getLTV'

const LTVField = ({ ltv }: { ltv: number }) => {
  const { control, setValue, trigger } = useFormContext<BorrowIntentFormSchema>()
  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })
  const collateralAmount = useWatch({
    control,
    name: 'collateralAmount',
  })
  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })

  return (
    <>
      <FormLabel>Change the borrow amount so the LTV is</FormLabel>
      <AssetSelectorValueSelectWrapper>
        <FormField
          control={control}
          name="ltv"
          render={({ field }) => (
            <FormItem>
              <PercentInput
                {...field}
                emphasis="low"
                max={INTENTS_LTV_MAX}
                onChange={(value) => {
                  const valueAsNumber = typeof value === 'number' ? value : 0

                  const borrowAmount = getBorrowAmountBasedOnLTV({
                    borrowAsset,
                    collateralAmount,
                    collateralAsset,
                    ltv: valueAsNumber,
                  })
                  setValue('borrowAmount', borrowAmount)
                  trigger('borrowAmount') // trigger validation
                  field.onChange(value)
                }}
                placeholder="0"
                textSize="3xl"
                value={ltv}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </AssetSelectorValueSelectWrapper>
    </>
  )
}

const LTVPopoverContent = ({ ltv }: { ltv: number }) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()

  const collateralAmount = useWatch({
    control,
    name: 'collateralAmount',
  })

  if (!collateralAmount) {
    return <p>Enter a collateral amount to adjust your loan to value ratio.</p>
  }

  if (collateralAmount) {
    return <LTVField ltv={ltv} />
  }
  return null
}

const LTVPopover = ({
  ltv,
  skeleton,
}: {
  ltv: number | null
  skeleton?: boolean
}) => {
  if (ltv === null) {
    return <div>{skeleton ? <SkeletonNumber /> : '?'}</div>
  }

  const formattedLTV = formatPercent({
    percent: numberToPercent(ltv || 0),
  }).trigger

  return (
    <div className="flex items-center gap-1">
      {ltv > HIGH_LTV ? <IconAlertTriangleFilled className="h-5 w-5 shrink-0" /> : null}
      {skeleton ? (
        <SkeletonNumber className="text-xl font-medium" />
      ) : (
        <div className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium">
          {formattedLTV}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button aria-label="Edit" className="shrink-0" disabled={skeleton} emphasis="low" size="icon-xs">
            <IconPencil className="inline h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <LTVPopoverContent ltv={ltv} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const LTVSection = ({ type }: { type: 'borrow' | 'lend' }) => {
  const { control, setValue, trigger } = useFormContext<BorrowIntentFormSchema>()

  const borrowAmount = useWatch({
    control,
    name: 'borrowAmount',
  })
  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })
  const collateralAmount = useWatch({
    control,
    name: 'collateralAmount',
  })
  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })
  const ltv = useWatch({
    control,
    name: 'ltv',
  })

  const ltvValue = getLTV({
    borrowAmount,
    borrowAsset,
    collateralAmount,
    collateralAsset,
  })

  useEffect(() => {
    if (ltvValue !== null && ltvValue > 0 && ltv !== Math.floor(ltvValue)) {
      setValue('ltv', Math.floor(ltvValue))
      trigger('ltv') // trigger validation
    } else if (ltvValue === 0 && ltv !== 0) {
      setValue('ltv', 0)
      trigger('ltv') // trigger validation
    } else if (ltvValue === null && ltv !== null) {
      // for unknown value assets such as external ERC20s.
      setValue('ltv', null)
      trigger('ltv') // trigger validation
    }
  }, [ltvValue, ltv, setValue, trigger])

  return (
    <CardSection>
      <div className="flex w-full items-center justify-between">
        <div className="grow">
          <Tooltip content="Loan To Value" trigger={<span className="font-medium">LTV</span>} underline />
        </div>
        <LTVPopover ltv={ltv} />
      </div>
      <FormField
        control={control}
        name="ltv"
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
      {ltv !== null && ltv > HIGH_LTV ? (
        <div className="mt-4 rounded-sm bg-stone-300 p-3 text-sm font-medium">
          {type === 'borrow'
            ? `An LTV over ${HIGH_LTV}% is unlikely to be filled by a
          prospective lender. This intent will only be visible to those using expert mode.`
            : `An LTV over ${HIGH_LTV}% is undercollateralized. Try asking for more collateral or lowering the lend amount to reach a healthier LTV and to lower risk to your position.`}
        </div>
      ) : null}
    </CardSection>
  )
}
