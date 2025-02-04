import { getNativeAssetInfo } from '@/config/chain/utils/getNativeAssetInfo'
import { TokenWithBalance, TokenWithValue } from '@/domain/common/types'
import { RiskAcknowledgementInfo } from '@/domain/liquidation-risk-warning/types'
import { useLiquidationRiskWarning } from '@/domain/liquidation-risk-warning/useLiquidationRiskWarning'
import { useAaveDataLayer } from '@/domain/market-info/aave-data-layer/useAaveDataLayer'
import { EPOCH_LENGTH } from '@/domain/market-info/consts'
import { updatePositionSummary } from '@/domain/market-info/updatePositionSummary'
import { useMarketInfo } from '@/domain/market-info/useMarketInfo'
import { Token } from '@/domain/types/Token'
import { useMarketWalletInfo } from '@/domain/wallet/useMarketWalletInfo'
import { InjectedActionsContext, Objective } from '@/features/actions/logic/types'
import { zodResolver } from '@hookform/resolvers/zod'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useChainId } from 'wagmi'
import { AssetInputSchema, normalizeDialogFormValues, useDebouncedDialogFormValues } from '../../common/logic/form'
import { FormFieldsForDialog, PageState, PageStatus } from '../../common/types'
import { getBorrowOptions } from './assets'
import { createBorrowObjectives } from './createBorrowObjectives'
import { getBorrowDialogFormValidator, getFormFieldsForBorrowDialog, setDesiredLoanToValue } from './form'
import { Percentage } from '@/domain/types/NumericValues'
import { UserPositionSummary } from '@/domain/market-info/marketInfo'
export interface UseBorrowDialogOptions {
  initialToken: Token
}

export interface UseBorrowDialogResult {
  updatedPositionSummary: UserPositionSummary
  borrowOptions: TokenWithBalance[]
  assetsToBorrowFields: FormFieldsForDialog
  setDesiredLoanToValue: (desiredLtv: Percentage) => void
  tokenToBorrow: TokenWithValue
  objectives: Objective[]
  actionsContext: InjectedActionsContext
  pageStatus: PageStatus
  form: UseFormReturn<AssetInputSchema>
  borrowAPY?: Percentage
  currentHealthFactor?: BigNumber
  updatedHealthFactor?: BigNumber
  riskAcknowledgement: RiskAcknowledgementInfo
}

export function useBorrowDialog({ initialToken }: UseBorrowDialogOptions): UseBorrowDialogResult {
  const chainId = useChainId()
  const { aaveData } = useAaveDataLayer({ chainId })
  const { marketInfo } = useMarketInfo({ chainId })
  const { marketInfo: marketInfoIn1Epoch } = useMarketInfo({ timeAdvance: EPOCH_LENGTH, chainId })
  const walletInfo = useMarketWalletInfo({ chainId })
  const nativeAssetInfo = getNativeAssetInfo(marketInfo.chainId)

  const [pageStatus, setPageStatus] = useState<PageState>('form')

  const form = useForm<AssetInputSchema>({
    resolver: zodResolver(getBorrowDialogFormValidator(marketInfo)),
    defaultValues: {
      symbol: initialToken.symbol,
      value: '',
    },
    mode: 'onChange',
  })

  const formValues = normalizeDialogFormValues(form.watch(), marketInfo)
  const borrowOptions = getBorrowOptions({
    token: initialToken,
    marketInfo,
    walletInfo,
    nativeAssetInfo,
  })
  const {
    debouncedFormValues: tokenToBorrow,
    isDebouncing,
    isFormValid,
  } = useDebouncedDialogFormValues({
    form,
    marketInfo,
  })

  const assetsToBorrowFields = getFormFieldsForBorrowDialog({
    form,
    marketInfo,
    marketInfoIn1Epoch,
    walletInfo,
  })
  const actions = createBorrowObjectives(tokenToBorrow)

  const updatedUserSummary = updatePositionSummary({
    borrows: [formValues],
    marketInfo,
    aaveData,
    nativeAssetInfo,
  })

  const currentHealthFactor = marketInfo.userPositionSummary.healthFactor
  const updatedHealthFactor = !formValues.value.eq(0) ? updatedUserSummary.healthFactor : undefined
  const borrowAPY = tokenToBorrow.reserve.variableBorrowApy

  const { riskAcknowledgement, disableActionsByRisk } = useLiquidationRiskWarning({
    type: 'liquidation-warning-borrow',
    isFormValid,
    currentHealthFactor,
    updatedHealthFactor,
  })

  const actionsEnabled = tokenToBorrow.value.gt(0) && isFormValid && !isDebouncing && !disableActionsByRisk

  return {
    updatedPositionSummary: updatedUserSummary,
    borrowOptions,
    borrowAPY,
    assetsToBorrowFields,
    setDesiredLoanToValue(desiredLtv: Percentage) {
      setDesiredLoanToValue({
        control: form,
        formValues,
        userPositionSummary: updatedUserSummary,
        desiredLtv,
      })
    },
    tokenToBorrow,
    objectives: actions,
    actionsContext: {
      marketInfo,
    },
    pageStatus: {
      actionsEnabled,
      state: pageStatus,
      goToSuccessScreen: () => setPageStatus('success'),
    },
    form,
    currentHealthFactor,
    updatedHealthFactor,
    riskAcknowledgement,
  }
}
