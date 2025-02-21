import { IconArrowsUpDown } from '@tabler/icons-react'
import { useFormContext, useWatch } from 'react-hook-form'

import type { LendIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { Button } from '@/astaria/components/Button'

import { isERC20Asset } from 'assets'

export const Flipper = () => {
  const { control, setValue, trigger } = useFormContext<LendIntentFormSchema>()
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

  if (!isERC20Asset(borrowAsset) || !isERC20Asset(collateralAsset)) {
    return null
  }

  const flipAssets = () => {
    setValue('borrowAmount', collateralAmount)
    setValue('borrowAsset', collateralAsset)
    setValue('collateralAmount', borrowAmount)
    setValue('collateralAsset', borrowAsset)
    trigger(['borrowAmount', 'borrowAsset', 'collateralAmount', 'collateralAsset']) // trigger validation
  }

  return (
    <div className="-my-3 flex justify-center">
      <Button emphasis="medium" onClick={() => flipAssets()} size="icon-xs">
        <IconArrowsUpDown className="inline h-5 w-5" />
      </Button>
    </div>
  )
}
