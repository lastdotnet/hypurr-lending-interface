import { UserPositionSummary } from '@/domain/market-info/marketInfo'
import { Percentage } from '@/domain/types/NumericValues'
import { assets } from '@/ui/assets'
import { Button } from '@/ui/atoms/button/Button'
import { Form } from '@/ui/atoms/form/Form'
import { ConnectOrSandboxCTAButtonGroup } from '@/ui/molecules/connect-or-sandbox-cta-button-group/ConnectOrSandboxCTAButtonGroup'
import { nonZeroOrDefault } from '@/utils/bigNumber'
import { UseFormReturn } from 'react-hook-form'
import { FormFieldsForAssetClass } from '../../logic/form/form'
import { EasyBorrowFormSchema } from '../../logic/form/validation'
import { ExistingPosition, PageStatus } from '../../logic/types'
import { Borrow } from './Borrow'
import { Deposits } from './Deposits'
import { LoanToValue } from './LoanToValue'
import { LoanToValueSlider } from './LoanToValueSlider'
import { BorrowFormAPYDetails } from '../../logic/useEasyBorrow'

interface EasyBorrowFlowProps {
  form: UseFormReturn<EasyBorrowFormSchema>
  updatedPositionSummary: UserPositionSummary
  assetsToBorrowFields: FormFieldsForAssetClass
  assetsToDepositFields: FormFieldsForAssetClass
  alreadyDeposited: ExistingPosition
  alreadyBorrowed: ExistingPosition
  apyDetails: BorrowFormAPYDetails
  onSubmit: () => void
  setDesiredLoanToValue: (desiredLtv: Percentage) => void
  disabled: boolean // whole form is disabled when when user submitted the form and actions are in progress
  guestMode: boolean
  openConnectModal: () => void
  openSandboxModal: () => void
  pageStatus: PageStatus
}

export function EasyBorrowForm(props: EasyBorrowFlowProps) {
  const {
    form,
    onSubmit,
    assetsToBorrowFields,
    assetsToDepositFields,
    alreadyDeposited,
    alreadyBorrowed,
    apyDetails,
    updatedPositionSummary,
    setDesiredLoanToValue,
    disabled,
    guestMode,
    openConnectModal,
    openSandboxModal,
  } = props

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-2 md:flex-row">
          <Deposits
            selectedAssets={assetsToDepositFields.selectedAssets}
            allAssets={assetsToDepositFields.assets}
            assetToMaxValue={assetsToDepositFields.assetToMaxValue}
            addAsset={assetsToDepositFields.addAsset}
            removeAsset={assetsToDepositFields.removeAsset}
            changeAsset={assetsToDepositFields.changeAsset}
            maxSelectedFieldName={assetsToDepositFields.maxSelectedFieldName}
            alreadyDeposited={alreadyDeposited}
            control={form.control}
            disabled={disabled}
            resetBorrowStatus={props.pageStatus.onProceedToForm}
            depositAPY={apyDetails.depositAPY}
          />
          <div>
            <img src={assets.link} className="m-2 mt-16 hidden md:block" />
          </div>
          <Borrow
            selectedAssets={assetsToBorrowFields.selectedAssets}
            allAssets={assetsToBorrowFields.assets}
            changeAsset={assetsToBorrowFields.changeAsset}
            alreadyBorrowed={alreadyBorrowed}
            control={form.control}
            disabled={disabled}
            resetBorrowStatus={props.pageStatus.onProceedToForm}
            borrowAPY={apyDetails.borrowAPY}
          />
        </div>

        <LoanToValue
          className="mt-10"
          loanToValue={updatedPositionSummary.loanToValue}
          maxLoanToValue={updatedPositionSummary.maxLoanToValue}
        />

        <LoanToValueSlider
          className="mt-10"
          ltv={updatedPositionSummary.loanToValue}
          maxAvailableLtv={nonZeroOrDefault(updatedPositionSummary.maxLoanToValue, Percentage(0.8))}
          liquidationLtv={nonZeroOrDefault(updatedPositionSummary.currentLiquidationThreshold, Percentage(0.825))}
          onLtvChange={(e) => {
            if (disabled) {
              props.pageStatus.onProceedToForm()
            }
            setDesiredLoanToValue(e)
          }}
        />

        {guestMode ? (
          <ConnectOrSandboxCTAButtonGroup
            className="mt-8"
            buttonText="Connect wallet"
            action={openConnectModal}
            openSandboxModal={openSandboxModal}
          />
        ) : (
          !disabled && (
            <Button type="submit" className="mt-8" rounded="full" disabled={!form.formState.isValid}>
              Continue
            </Button>
          )
        )}
      </form>
    </Form>
  )
}
