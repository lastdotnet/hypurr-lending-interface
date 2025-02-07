import { getBorrowMaxValue } from '@/domain/action-max-value-getters/getBorrowMaxValue'
import { MarketInfo, UserPositionSummary } from '@/domain/market-info/marketInfo'
import {
  borrowValidationIssueToMessage,
  getValidateBorrowArgs,
  validateBorrow,
} from '@/domain/market-validators/validateBorrow'
import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { MarketWalletInfo } from '@/domain/wallet/useMarketWalletInfo'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { AssetInputSchema, DialogFormNormalizedData } from '../../common/logic/form'
import { FormFieldsForDialog } from '../../common/types'
import { formFormat } from '@/domain/common/format'
import BigNumber from 'bignumber.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getBorrowDialogFormValidator(marketInfo: MarketInfo) {
  return AssetInputSchema.superRefine((field, ctx) => {
    const value = NormalizedUnitNumber(field.value === '' ? '0' : field.value)
    const reserve = marketInfo.findOneReserveBySymbol(field.symbol)

    const validationIssue = validateBorrow(getValidateBorrowArgs(value, reserve, marketInfo))

    if (validationIssue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: borrowValidationIssueToMessage[validationIssue],
        path: ['value'],
      })
    }
  })
}

export interface GetFormFieldsForBorrowDialogParams {
  form: UseFormReturn<AssetInputSchema>
  marketInfo: MarketInfo
  marketInfoIn1Epoch: MarketInfo
  walletInfo: MarketWalletInfo
}
export function getFormFieldsForBorrowDialog({
  form,
  marketInfo,
  marketInfoIn1Epoch,
  walletInfo,
}: GetFormFieldsForBorrowDialogParams): FormFieldsForDialog {
  // eslint-disable-next-line func-style
  const changeAsset = (newSymbol: TokenSymbol): void => {
    form.setValue('symbol', newSymbol)
    form.setValue('value', '')
    form.clearErrors()
  }

  const { symbol, value } = form.getValues()
  // We use the reserve from the future market info to account for possible interest accrual in the reserve.
  // This is important for the borrow cap and isolated debt ceiling validation.
  // In the same time we use current market info to get the user's current position - we do not
  // account for interest accrual here.
  const reserveIn1Epoch = marketInfoIn1Epoch.findOneReserveBySymbol(symbol)

  const borrowValidationArgs = getValidateBorrowArgs(NormalizedUnitNumber(0), reserveIn1Epoch, marketInfo)
  const validationIssue = validateBorrow(borrowValidationArgs)

  const borrowMaxValue = getBorrowMaxValue({
    validationIssue,
    user: borrowValidationArgs.user,
    asset: borrowValidationArgs.asset,
    facilitatorBorrowLimit: marketInfo.facilitatorBorrowLimit,
  })

  return {
    selectedAsset: {
      value,
      token: reserveIn1Epoch.token,
      balance: walletInfo.findWalletBalanceForSymbol(symbol),
    },
    maxSelectedFieldName: 'isMaxSelected',
    changeAsset,
    maxValue: borrowMaxValue,
  }
}

interface SetDesiredLoanToValueProps {
  control: UseFormReturn<AssetInputSchema>
  formValues: DialogFormNormalizedData
  userPositionSummary: UserPositionSummary
  desiredLtv: Percentage
}

export function setDesiredLoanToValue({
  control,
  formValues,
  userPositionSummary,
  desiredLtv,
}: SetDesiredLoanToValueProps): void {
  const toAdd = userPositionSummary.totalCollateralUSD
    .multipliedBy(desiredLtv)
    .minus(userPositionSummary.totalBorrowsUSD)
    .dividedBy(formValues.reserve.priceInUSD)

  const current = formValues.value
  const result = current.plus(toAdd)

  const newBorrowAmount = BigNumber.max(0, formFormat(result))

  control.setValue('isMaxSelected', false)
  control.setValue('value', newBorrowAmount.toFixed(), {
    shouldValidate: true,
    shouldTouch: true,
  })
}
