import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ApproveCollateralButton } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/ApproveCollateralButton'
import { SignIntentButton } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/SignIntentButton'
import { Steps } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/Steps'
import { useAllowanceCollateral } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceCollateral'
import { useSignIntent } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/useSignIntent'
import { insertLendIntent } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/insertLendIntent'
import { type LendIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { resetLendIntentForm } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/resetLendIntentForm'
import { useLendIntentRequest } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/useLendIntentRequest'
import { INTENTS_QUERY_KEY, LEND_INTENTS_QUERY_KEY } from '@/app/isolated/intents/_/constants'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { ERC20Display } from '@/astaria/components/AssetDisplay/ERC20Display'
import { Card, CardLabelValue, CardSection } from '@/astaria/components/Card'
import { DialogActions, DialogContent, DialogError } from '@/astaria/components/Dialog'
import { LTV } from '@/astaria/components/LTV'
import { Percent } from '@/astaria/components/Percent'
import { useChainId } from '@/astaria/hooks/useChainId'
import { useSubmitToApi } from '@/astaria/hooks/useSubmitToApi'
import { convertAPYFieldToBigInt } from '@/astaria/utils/convertAPYFieldToBigInt'
import { convertAssetAndAmountToAsset } from '@/astaria/utils/convertAssetAndAmountToAsset'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'

import { isERC20Asset } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

const IntentDetails = () => {
  const { control } = useFormContext<LendIntentFormSchema>()
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
  const apyField = useWatch({
    control,
    name: 'apy',
  })
  const repeatFill = useWatch({
    control,
    name: 'repeatFill',
  })
  const apy = convertAPYFieldToBigInt({ apyField, borrowAsset })

  return (
    <Card receiptStyle>
      <CardSection>
        <CardLabelValue
          label="Willing to lend"
          value={
            <ERC20Display
              className="text-2xl font-medium"
              erc20={{
                ...borrowAsset,
                amount: borrowAmount || 0n,
              }}
              highPrecision
            />
          }
        />
        <CardLabelValue
          className="flex justify-between"
          label="Min APY"
          value={<Percent className="font-semibold" decimals={borrowAsset.decimals} percent={apy} />}
        />
      </CardSection>
      <CardSection>
        <AssetDisplay
          asset={convertAssetAndAmountToAsset({
            amount: collateralAmount,
            asset: collateralAsset,
          })}
          className="font-medium"
          highPrecision
          triggerExtraWording="collateral"
        />
      </CardSection>
      <CardSection>
        <CardLabelValue
          className="flex justify-between"
          label="Will fill"
          value={<span className="font-semibold">{repeatFill ? 'Indefinitely' : 'Once'}</span>}
        />
      </CardSection>
      {isERC20Asset(collateralAsset) ? (
        <CardSection>
          <CardLabelValue
            className="flex justify-between"
            label="Loan to value"
            value={
              <LTV
                borrowAmount={borrowAmount}
                borrowAsset={borrowAsset}
                className="font-semibold"
                collateralAmount={collateralAmount}
                collateralAsset={collateralAsset}
              />
            }
          />
        </CardSection>
      ) : null}
    </Card>
  )
}

export const TransmitLendIntentConfirmSteps = ({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()
  const queryClient = useQueryClient()
  const { control, reset: resetForm } = useFormContext<LendIntentFormSchema>()
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
  const apyField = useWatch({
    control,
    name: 'apy',
  })
  const apy = convertAPYFieldToBigInt({ apyField, borrowAsset })
  const repeatFill = useWatch({
    control,
    name: 'repeatFill',
  })

  // 1. Execute approval if required
  const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove } = useAllowanceCollateral({
    asset: convertAssetAndAmountToAsset({
      amount: borrowAmount,
      asset: borrowAsset,
    }),
  })

  // 2. Get intent payload from API
  const {
    error: errorIntentRequest,
    isFetching,
    isLoading,
    lendIntentPayload,
  } = useLendIntentRequest({
    apy,
    borrow: { ...borrowAsset, amount: borrowAmount || 0n },
    collateral: convertAssetAndAmountToAsset({
      amount: collateralAmount,
      asset: collateralAsset,
    }),
    enabled: isFinishedApprove,
    repeatFill: !!repeatFill,
  })

  // 3. Sign typed data
  const {
    error: errorSign,
    isFinished: isFinishedSign,
    isPending: isLoadingSign,
    reset: resetSign,
    signature,
    signTypedData,
  } = useSignIntent({ typedData: lendIntentPayload?.typedData })

  // 4. Send signed caveat to API (with server action!)
  const {
    error: errorTransmitLendIntent,
    mutate: transmitLendIntent,
    reset: resetTransmitLendIntent,
  } = useSubmitToApi({
    errorMessage: {
      description: 'Your lend intent was not transmitted. Please try again later.',
      title: 'Error',
    },
    mutationFn: insertLendIntent,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [INTENTS_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [LEND_INTENTS_QUERY_KEY] })
      resetForm(resetLendIntentForm({ borrowAsset, collateralAsset }))
      resetSign()
      resetTransmitLendIntent()
      setDialogOpen(false)
      sendSafaryClubEvent({
        chainId,
        eventName: 'Place a lending intent',
        eventType: 'onchain',
      })
    },
    successMessage: {
      description: 'Your lend intent was transmitted!',
      title: 'Lend intent transmitted',
    },
  })

  useEffect(() => {
    if (isFinishedApprove && isFinishedSign && !!signature && lendIntentPayload?.unsignedCaveat && !!address) {
      const signedCaveat = {
        ...lendIntentPayload.unsignedCaveat,
        signature,
      }

      transmitLendIntent({
        chainId,
        owner: address,
        signedCaveat,
      })
    }
  }, [
    chainId,
    lendIntentPayload?.unsignedCaveat,
    isFinishedApprove,
    isFinishedSign,
    signature,
    transmitLendIntent,
    address,
  ])

  const error = errorTransmitLendIntent || errorSign || errorIntentRequest || errorApprove

  return (
    <>
      <Steps
        amount={borrowAmount}
        asset={borrowAsset}
        isConfirmingApprove={isConfirmingApprove}
        isFinishedApprove={isFinishedApprove}
        isFinishedSign={isFinishedSign}
        isLoadingApprove={isLoadingApprove}
        isLoadingSign={isLoadingSign}
      />
      <DialogContent>
        <IntentDetails />
        <p className="text-xs">
          This intent will be live for 24 hours. If someone accepts it, the loan will execute at the current APY at time
          of acceptance. If accepted, the lender can start a recall auction after 24 hours.
        </p>
        {error ? <DialogError error={error} /> : null}
      </DialogContent>
      <DialogActions>
        {(() => {
          if (!isFinishedApprove) {
            return (
              <ApproveCollateralButton
                approve={approve}
                isConfirmingApprove={isConfirmingApprove}
                isLoadingApprove={isLoadingApprove}
              />
            )
          }
          if (isFinishedApprove && !isFinishedSign) {
            return (
              <SignIntentButton
                // eslint-disable-next-line
                isLoadingPayload={isFetching && isLoading}
                isLoadingSign={isLoadingSign}
                signTypedData={signTypedData}
              />
            )
          }
          return null
        })()}
      </DialogActions>
    </>
  )
}
