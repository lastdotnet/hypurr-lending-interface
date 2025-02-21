'use client'

import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { TransmitIntentFillBonus } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFillBonus'
import { APYSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/APYSection'
import { BorrowSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/BorrowSection'
import { CollateralSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/CollateralSection'
import { Flipper } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/Flipper'
import { LTVSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/LTVSection'
import { RepeatFillSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/RepeatFillSection'
import { useDefaultAssets } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/useDefaultAssets'
import { TransmitLendIntentConfirmSteps } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/TransmitLendIntentConfirmSteps'
import {
  type LendIntentFormSchema,
  lendIntentFormSchema,
} from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { Button } from '@/astaria/components/Button'
import { CardSection } from '@/astaria/components/Card'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { Connected } from '@/astaria/components/Connected'
import { DialogActions, DialogContent } from '@/astaria/components/Dialog'
import { Form } from '@/astaria/components/Form'
import { LEND_INTENT_APY_DEFAULT } from '@/astaria/constants/constants'

import { isERC20Asset } from 'assets'

export const TransmitLendIntentForm = ({
  isOnConfirmSteps,
  setDialogOpen,
  setIsOnConfirmSteps,
}: {
  isOnConfirmSteps: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsOnConfirmSteps: Dispatch<SetStateAction<boolean>>
}) => {
  const { borrowAsset: borrowAssetDefault, collateralAsset: collateralAssetDefault } = useDefaultAssets()

  const form = useForm<LendIntentFormSchema>({
    defaultValues: {
      // Do not use default values of 0 here as they cause a 0 to appear if the input is cleared
      apy: LEND_INTENT_APY_DEFAULT,
      borrowAsset: borrowAssetDefault,
      collateralAsset: collateralAssetDefault,
      ltv: 0,
      repeatFill: false,
    },
    mode: 'onTouched',
    resolver: zodResolver(lendIntentFormSchema),
  })
  const { control, handleSubmit, setValue } = form
  const borrowAsset = useWatch({
    control,
    name: 'borrowAsset',
  })
  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })

  // TODO: make this less dirty
  useEffect(() => {
    if (
      borrowAsset.usdValue === undefined &&
      borrowAssetDefault.usdValue &&
      borrowAssetDefault.address === borrowAsset.address
    ) {
      setValue('borrowAsset', borrowAssetDefault)
    }
    if (
      isERC20Asset(collateralAsset) &&
      collateralAsset.usdValue === undefined &&
      collateralAssetDefault.usdValue &&
      collateralAssetDefault.address === collateralAsset.address
    ) {
      setValue('collateralAsset', collateralAssetDefault)
    }
  }, [borrowAsset, borrowAssetDefault, collateralAsset, collateralAssetDefault, setValue])

  const onSubmit: SubmitHandler<LendIntentFormSchema> = () => {
    setIsOnConfirmSteps(true)
  }

  return (
    <Form {...form}>
      <form className="space-y-2" id="lendForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        {isOnConfirmSteps ? (
          <TransmitLendIntentConfirmSteps setDialogOpen={setDialogOpen} />
        ) : (
          <>
            <DialogContent>
              <TransmitIntentFillBonus />
              <section>
                <CollateralSection
                  copy={{
                    dialogTitle: 'Select their collateral',
                    inputLabel: 'Their collateral',
                  }}
                  type="lend"
                />
                <Flipper />
                <BorrowSection
                  copy={{
                    dialogTitle: 'Select a token they borrow',
                    inputLabel: 'They borrow',
                  }}
                  type="lend"
                />
              </section>
              <LTVSection type="lend" />
              <RepeatFillSection />
              <CardSection>
                <APYSection
                  label="Minimum APY"
                  tooltip="The lowest APY you’re willing to accept for a loan of your assets."
                />
              </CardSection>
            </DialogContent>
            <DialogActions>
              <Connected
                connectedComponent={
                  <Button form="lendForm" fullWidth rounded="dialog" type="submit">
                    Transmit lend intent
                  </Button>
                }
                notConnectedComponent={<ConnectButton fullWidth />}
              />
            </DialogActions>
          </>
        )}
      </form>
    </Form>
  )
}
