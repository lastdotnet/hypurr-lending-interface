import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { addOrRemoveDecimals, numberToBigInt } from 'common'

import { IntentSuggestions } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/IntentSuggestions'
import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { BalanceAndMaxSection } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/BalanceAndMaxSection'
import { USDValue } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValue'
import { AssetImageBox } from '@/astaria/components/AssetImageBox'
import { AssetSelectorValueSelectWrapper } from '@/astaria/components/AssetSelector/AssetSelectorValueSelectWrapper'
import { ERC20Selector } from '@/astaria/components/AssetSelector/ERC20Selector'
import { ERC721Selector } from '@/astaria/components/AssetSelector/ERC721Selector'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/astaria/components/Tabs'
import { shorten } from '@/astaria/utils/shorten'

import { ERC_721_COLLECTIONS_WHITELIST, isERC20Asset, isERC721Asset } from 'assets'

type Copy = { dialogTitle: string; inputLabel: string }

const CollateralInput = ({ copy }: { copy: Copy }) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()
  const collateralAmount = useWatch({
    control,
    name: 'collateralAmount',
  })
  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })

  if (isERC20Asset(collateralAsset)) {
    return (
      <FormField
        control={control}
        name="collateralAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{copy.inputLabel}</FormLabel>
            <FormControl>
              <BigIntInput
                {...field}
                decimals={collateralAsset.decimals}
                emphasis="low"
                placeholder="0"
                textSize="3xl"
              />
            </FormControl>
            <FormMessage>
              <USDValue amount={collateralAmount} asset={collateralAsset} className="text-xs font-medium" />
            </FormMessage>
          </FormItem>
        )}
      />
    )
  }
  if (isERC721Asset(collateralAsset)) {
    return (
      <FormItem className="shrink-0">
        <FormLabel>{copy.inputLabel}</FormLabel>
        <AssetImageBox asset={collateralAsset} className="h-24 w-24" indicator={false} />
      </FormItem>
    )
  }

  return null
}

const CollateralAsset = ({
  allowNFT,
  copy,
}: {
  allowNFT?: boolean
  copy: Copy
}) => {
  const { clearErrors, control, setValue, trigger } = useFormContext<BorrowIntentFormSchema>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const collateralAmount = useWatch({
    control,
    name: 'collateralAmount',
  })
  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })

  return (
    <FormField
      control={control}
      name="collateralAsset"
      render={({ field }) => {
        const selectedAsset = () => {
          if (field.value) {
            if (isERC20Asset(field.value)) {
              return (
                <div className="flex min-w-0 items-center gap-1">
                  <ERC20Image erc20={field.value} size="sm" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{field.value.symbol}</span>
                </div>
              )
            }
            if (isERC721Asset(field.value)) {
              return `#${shorten({
                maxLength: 10,
                value: field.value.tokenId.toString(),
              })}`
            }
          }
          return 'Asset'
        }

        const tokenSelector = (
          <ERC20Selector
            asset={field.value}
            setAsset={(value) => {
              setValue('collateralAsset', value)
              clearErrors('collateralAsset')
              if (isERC20Asset(collateralAsset) && isERC20Asset(field.value)) {
                setValue(
                  'collateralAmount',
                  addOrRemoveDecimals({
                    newDecimals: value.decimals,
                    oldDecimals: collateralAsset.decimals,
                    value: collateralAmount,
                  }),
                )
              } else {
                // If we were an ERC721 before
                setValue('collateralAmount', 0n)
              }
              trigger('collateralAmount') // trigger validation
            }}
            setDialogOpen={setDialogOpen}
            type="collateral"
          />
        )

        return (
          <>
            <FormItem>
              <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                <DialogTrigger asChild>
                  <SelectDialogButton id="collateral-asset-button">{selectedAsset()}</SelectDialogButton>
                </DialogTrigger>
                <DialogContainer>
                  <DialogHeader>
                    <DialogTitle>{copy.dialogTitle}</DialogTitle>
                  </DialogHeader>
                  <DialogContent>
                    {allowNFT ? (
                      <Tabs defaultValue={isERC721Asset(field.value) ? 'nfts' : 'tokens'}>
                        <TabsList className="mb-5">
                          <TabsTrigger value="tokens">Tokens</TabsTrigger>
                          <TabsTrigger value="nfts">NFTs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tokens">{tokenSelector}</TabsContent>
                        <TabsContent value="nfts">
                          <ERC721Selector
                            asset={field.value}
                            setAsset={(value) => {
                              setValue('collateralAsset', value)
                              setValue('collateralAmount', numberToBigInt({ amount: 1 }))
                              clearErrors('collateralAsset')
                            }}
                            setDialogOpen={setDialogOpen}
                          />
                        </TabsContent>
                      </Tabs>
                    ) : (
                      tokenSelector
                    )}
                  </DialogContent>
                </DialogContainer>
              </Dialog>
              <FormMessage />
            </FormItem>
            {isERC721Asset(collateralAsset) ? (
              <>
                {collateralAsset.collection.name ? (
                  <div className="text-right text-xs font-bold">{collateralAsset.collection.name}</div>
                ) : null}
                {collateralAsset?.address &&
                !ERC_721_COLLECTIONS_WHITELIST.some(
                  (address) => address.toLowerCase() === collateralAsset.address.toLowerCase(),
                ) ? (
                  <div className="text-right text-xs">
                    This collection is unverified. It will only be visible to those using expert mode.
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        )
      }}
    />
  )
}

export const CollateralSection = ({
  allowNFT,
  copy,
  type,
}: {
  allowNFT?: boolean
  copy: Copy
  type: 'borrow' | 'lend'
}) => {
  const { control } = useFormContext<BorrowIntentFormSchema>()

  const collateralAsset = useWatch({
    control,
    name: 'collateralAsset',
  })

  return (
    <CardSection>
      <AssetSelectorValueSelectWrapper>
        <CollateralInput copy={copy} />
        <div className="flex flex-col items-end">
          <div className="h-8" />
          <CollateralAsset allowNFT={allowNFT} copy={copy} />
          {type === 'borrow' ? (
            <BalanceAndMaxSection amountFieldName="collateralAmount" asset={collateralAsset} />
          ) : null}
        </div>
      </AssetSelectorValueSelectWrapper>
      {type === 'borrow' ? <IntentSuggestions type={type} /> : null}
    </CardSection>
  )
}
