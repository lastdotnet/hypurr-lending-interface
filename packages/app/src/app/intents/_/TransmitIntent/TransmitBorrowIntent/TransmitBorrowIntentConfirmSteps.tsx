import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { type BorrowIntentFormSchema } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { insertBorrowIntent } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/insertBorrowIntent'
import { resetBorrowIntentForm } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/resetBorrowIntentForm'
import { useBorrowIntentRequest } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/useBorrowIntentRequest'
import { ApproveCollateralButton } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/ApproveCollateralButton'
import { SignIntentButton } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/SignIntentButton'
import { Steps } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/Steps'
import { useAllowanceCollateral } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/useAllowanceCollateral'
import { useSignIntent } from '@/app/intents/_/TransmitIntent/TransmitIntentDialogComponents/useSignIntent'
import { BORROW_INTENTS_QUERY_KEY, INTENTS_QUERY_KEY } from '@/app/intents/_/constants'
import { NeedsAllowanceResetWarning } from '@/app/loans/_/LoanCard/LoanActionButton/NeedsAllowanceResetWarning'
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
  const { control } = useFormContext<BorrowIntentFormSchema>()
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

  return (
    <Card receiptStyle>
      <CardSection>
        <CardLabelValue
          label="Asking to borrow"
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
          label="Max APY"
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

export const TransmitBorrowIntentConfirmSteps = ({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()
  const queryClient = useQueryClient()
  const { control, reset: resetForm } = useFormContext<BorrowIntentFormSchema>()
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

  // 1. Execute approval if required
  const { approve, errorApprove, isConfirmingApprove, isFinishedApprove, isLoadingApprove, needsAllowanceReset } =
    useAllowanceCollateral({
      asset: convertAssetAndAmountToAsset({
        amount: collateralAmount,
        asset: collateralAsset,
      }),
    })

  // 2. Get intent payload from API
  const {
    borrowIntentPayload,
    error: errorIntentRequest,
    isFetching,
    isLoading,
  } = useBorrowIntentRequest({
    apy,
    borrow: { ...borrowAsset, amount: borrowAmount || 0n },
    collateral: convertAssetAndAmountToAsset({
      amount: collateralAmount,
      asset: collateralAsset,
    }),
    enabled: isFinishedApprove && Boolean(borrowAmount && apy),
  })

  // 3. Sign typed data
  const {
    error: errorSign,
    isFinished: isFinishedSign,
    isPending: isLoadingSign,
    reset: resetSign,
    signature,
    signTypedData,
  } = useSignIntent({ typedData: borrowIntentPayload?.typedData })

  // 4. Send signed caveat to API (with server action!)
  const {
    error: errorTransmitIntent,
    mutate: transmitIntent,
    reset: resetTransmitIntent,
  } = useSubmitToApi({
    errorMessage: {
      description: 'Your borrow intent was not transmitted. Please try again later.',
      title: 'Error',
    },
    mutationFn: insertBorrowIntent,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [INTENTS_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [BORROW_INTENTS_QUERY_KEY] })
      resetForm(resetBorrowIntentForm({ borrowAsset, collateralAsset }))
      resetSign()
      resetTransmitIntent()
      setDialogOpen(false)
      sendSafaryClubEvent({
        chainId,
        eventName: 'Place a borrow Intent',
        eventType: 'onchain',
      })
    },
    successMessage: {
      description: 'Your borrow intent was transmitted!',
      title: 'Borrow intent transmitted',
    },
  })

  useEffect(() => {
    if (isFinishedApprove && isFinishedSign && !!signature && borrowIntentPayload?.unsignedCaveat && !!address) {
      const signedCaveat = {
        ...borrowIntentPayload.unsignedCaveat,
        signature,
      }
      transmitIntent({
        chainId,
        owner: address,
        signedCaveat,
      })
    }
  }, [
    chainId,
    borrowIntentPayload?.unsignedCaveat,
    isFinishedApprove,
    isFinishedSign,
    signature,
    transmitIntent,
    address,
  ])

  const error = errorTransmitIntent || errorSign || errorIntentRequest || errorApprove

  return (
    <>
      <Steps
        amount={collateralAmount}
        asset={collateralAsset}
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
        {needsAllowanceReset ? <NeedsAllowanceResetWarning asset={collateralAsset} /> : null}
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
                isLoadingPayload={isLoading && isFetching}
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
