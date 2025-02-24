import { RiskAcknowledgementInfo } from '@/domain/liquidation-risk-warning/types'
import { LiquidationDetails } from '@/domain/market-info/getLiquidationDetails'
import { UserPositionSummary } from '@/domain/market-info/marketInfo'
import { Percentage } from '@/domain/types/NumericValues'
import { ActionsContainer } from '@/features/actions/ActionsContainer'
import { InjectedActionsContext, Objective } from '@/features/actions/logic/types'
import { Button } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { HealthFactorPanel } from '@/ui/organisms/health-factor-panel/HealthFactorPanel'
import { RiskAcknowledgement } from '@/ui/organisms/risk-acknowledgement/RiskAcknowledgement'
import { X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { FormFieldsForAssetClass } from '../logic/form/form'
import { EasyBorrowFormSchema } from '../logic/form/validation'
import { ExistingPosition, PageStatus } from '../logic/types'
import { BorrowFormAPYDetails } from '../logic/useEasyBorrow'
import { EasyBorrowForm } from './form/EasyBorrowForm'
import { Trans } from '@lingui/react/macro'

export interface EasyBorrowPanelProps {
  pageStatus: PageStatus
  form: UseFormReturn<EasyBorrowFormSchema>
  assetsToBorrowFields: FormFieldsForAssetClass
  assetsToDepositFields: FormFieldsForAssetClass
  alreadyDeposited: ExistingPosition
  alreadyBorrowed: ExistingPosition
  updatedPositionSummary: UserPositionSummary
  setDesiredLoanToValue: (desiredLtv: Percentage) => void
  liquidationDetails?: LiquidationDetails
  riskAcknowledgement: RiskAcknowledgementInfo
  objectives: Objective[]
  apyDetails: BorrowFormAPYDetails
  guestMode: boolean
  openConnectModal: () => void
  openSandboxModal: () => void
  healthFactorPanelRef: React.RefObject<HTMLDivElement>
  actionsContext: InjectedActionsContext
}

export function EasyBorrowPanel(props: EasyBorrowPanelProps) {
  const { pageStatus, updatedPositionSummary, objectives, liquidationDetails, healthFactorPanelRef, actionsContext } =
    props

  return (
    <Panel.Wrapper className="flex min-w-full max-w-3xl flex-col self-center p-4 md:p-8">
      <div className="mb-6 flex h-10 flex-row items-center justify-between">
        <Typography variant="h3">
          <Trans>Deposit and borrow</Trans>
        </Typography>
        {pageStatus.state === 'confirmation' && (
          <Button onClick={pageStatus.onProceedToForm} variant="icon" className="-mr-4">
            <X size={28} />
          </Button>
        )}
      </div>

      <EasyBorrowForm {...props} onSubmit={pageStatus.submitForm} disabled={pageStatus.state !== 'form'} />

      <div className="mt-6">
        <HealthFactorPanel
          hf={updatedPositionSummary.healthFactor}
          liquidationDetails={liquidationDetails}
          variant="full-details"
          ref={healthFactorPanelRef}
        />
      </div>

      {pageStatus.state === 'confirmation' && (
        <div className="mt-6 flex flex-col gap-6">
          {props.riskAcknowledgement.warning && (
            <RiskAcknowledgement
              riskAcknowledged={props.riskAcknowledgement.value}
              onStatusChange={props.riskAcknowledgement.onStatusChange}
              warning={props.riskAcknowledgement.warning}
            />
          )}

          <ActionsContainer
            objectives={objectives}
            context={actionsContext}
            onFinish={pageStatus.goToSuccessScreen}
            enabled={pageStatus.actionsEnabled}
          />
        </div>
      )}
    </Panel.Wrapper>
  )
}
