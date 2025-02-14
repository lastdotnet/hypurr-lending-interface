'use client'

import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { TransmitBorrowIntentConfirmSteps } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/TransmitBorrowIntentConfirmSteps'
import {
  type BorrowIntentFormSchema,
  borrowIntentFormSchema,
} from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { TransmitIntentFillBonus } from '@/app/intents/_/TransmitIntent/TransmitIntentFillBonus'
import { APYSection } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/APYSection'
import { BorrowSection } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/BorrowSection'
import { CollateralSection } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/CollateralSection'
import { Flipper } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/Flipper'
import { LTVSection } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/LTVSection'
import { useDefaultAssets } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/useDefaultAssets'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/astaria/components/Accordion'
import { Button } from '@/astaria/components/Button'
import { CardSection } from '@/astaria/components/Card'
import { ConnectButton } from '@/astaria/components/ConnectButton'
import { Connected } from '@/astaria/components/Connected'
import { DialogActions, DialogContent } from '@/astaria/components/Dialog'
import { Form } from '@/astaria/components/Form'
import { BORROW_INTENT_APY_DEFAULT } from '@/astaria/constants/constants'

import { isERC20Asset } from 'assets'

export const TransmitBorrowIntentForm = ({
  isOnConfirmSteps,
  setDialogOpen,
  setIsOnConfirmSteps,
}: {
  isOnConfirmSteps: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsOnConfirmSteps: Dispatch<SetStateAction<boolean>>
}) => {
  const { borrowAsset: borrowAssetDefault, collateralAsset: collateralAssetDefault } = useDefaultAssets()

  const form = useForm<BorrowIntentFormSchema>({
    defaultValues: {
      // Do not use default values of 0 here as they cause a 0 to appear if the input is cleared
      apy: BORROW_INTENT_APY_DEFAULT,
      borrowAsset: borrowAssetDefault,
      collateralAsset: collateralAssetDefault,
      ltv: 0,
    },
    mode: 'onTouched',
    resolver: zodResolver(borrowIntentFormSchema),
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

  const onSubmit: SubmitHandler<BorrowIntentFormSchema> = () => {
    setIsOnConfirmSteps(true)
  }

  return (
    <Form {...form}>
      <form className="space-y-2" id="borrowForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        {isOnConfirmSteps ? (
          <TransmitBorrowIntentConfirmSteps setDialogOpen={setDialogOpen} />
        ) : (
          <>
            <DialogContent>
              <TransmitIntentFillBonus />
              <section>
                <CollateralSection
                  allowNFT
                  copy={{
                    dialogTitle: 'Select your collateral',
                    inputLabel: 'Your collateral',
                  }}
                  type="borrow"
                />
                <Flipper />
                <BorrowSection
                  copy={{
                    dialogTitle: 'Select a token to borrow',
                    inputLabel: 'Borrow',
                    tooltip: 'The minimum amount you’d like to borrow. A lender may choose to lend a higher amount.',
                  }}
                  type="borrow"
                />
              </section>
              <LTVSection type="borrow" />
              <CardSection>
                <Accordion collapsible type="single">
                  <AccordionItem className="-mb-4 -mt-4" value="apy">
                    <AccordionTrigger>Advanced</AccordionTrigger>
                    <AccordionContent>
                      <APYSection
                        label="Maximum APY"
                        tooltip="The maximum APY you’re willing to accept. A lender may choose to lend at a lower APY."
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardSection>
            </DialogContent>
            <DialogActions>
              <Connected
                connectedComponent={
                  <Button form="borrowForm" fullWidth rounded="dialog" type="submit">
                    Transmit borrow intent
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
