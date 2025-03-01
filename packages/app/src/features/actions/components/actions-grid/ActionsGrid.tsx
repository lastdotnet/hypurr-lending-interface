import { assertNever } from '@/utils/assertNever'
import { ApproveDelegationActionRow } from '../../flavours/approve-delegation/ApproveDelegationActionRow'
import { ApproveActionRow } from '../../flavours/approve/ApproveActionRow'
import { BorrowActionRow } from '../../flavours/borrow/BorrowActionRow'
import { ClaimFarmRewardsActionRow } from '../../flavours/claim-farm-rewards/ClaimFarmRewardsActionRow'
import { ClaimMarketRewardsActionRow } from '../../flavours/claim-market-rewards/ClaimMarketRewardsActionRow'
import { DepositToSavingsActionRow } from '../../flavours/deposit-to-savings/DepositToSavingsActionRow'
import { DepositActionRow } from '../../flavours/deposit/DepositActionRow'
import { DowngradeActionRow } from '../../flavours/downgrade/DowngradeActionRow'
import { PermitActionRow } from '../../flavours/permit/PermitActionRow'
import { PsmConvertActionRow } from '../../flavours/psm-convert/PsmConvertActionRow'
import { RepayActionRow } from '../../flavours/repay/RepayActionRow'
import { SetUseAsCollateralActionRow } from '../../flavours/set-use-as-collateral/SetUseAsCollateralActionRow'
import { SetUserEModeActionRow } from '../../flavours/set-user-e-mode/SetUserEModeActionRow'
import { StakeActionRow } from '../../flavours/stake/StakeActionRow'
import { UnstakeActionRow } from '../../flavours/unstake/UnstakeActionRow'
import { UpgradeActionRow } from '../../flavours/upgrade/UpgradeActionRow'
import { WithdrawFromSavingsActionRow } from '../../flavours/withdraw-from-savings/WithdrawFromSavingsActionRow'
import { WithdrawActionRow } from '../../flavours/withdraw/WithdrawActionRow'
import { ActionHandler } from '../../logic/types'
import { ActionRowVariant } from '../action-row/types'

interface ActionsGridProps {
  actionHandlers: ActionHandler[]
  variant: ActionRowVariant
}

export function ActionsGrid({ actionHandlers, variant }: ActionsGridProps) {
  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-4 md:grid-cols-[auto_auto_auto_1fr_auto]">
      {actionHandlers.map((handler, index) => {
        const props = {
          index: index + 1,
          actionHandlerState: handler.state,
          onAction: handler.onAction,
          variant,
        }

        switch (handler.action.type) {
          case 'approve':
            return <ApproveActionRow action={handler.action} key={index} {...props} />
          case 'approveDelegation':
            return <ApproveDelegationActionRow action={handler.action} key={index} {...props} />
          case 'borrow':
            return <BorrowActionRow action={handler.action} key={index} {...props} />
          case 'deposit':
            return <DepositActionRow action={handler.action} key={index} {...props} />
          case 'permit':
            return <PermitActionRow action={handler.action} key={index} {...props} />
          case 'repay':
            return <RepayActionRow action={handler.action} key={index} {...props} />
          case 'setUseAsCollateral':
            return <SetUseAsCollateralActionRow action={handler.action} key={index} {...props} />
          case 'setUserEMode':
            return <SetUserEModeActionRow action={handler.action} key={index} {...props} />
          case 'withdraw':
            return <WithdrawActionRow action={handler.action} key={index} {...props} />
          case 'claimMarketRewards':
            return <ClaimMarketRewardsActionRow action={handler.action} key={index} {...props} />
          case 'withdrawFromSavings':
            return <WithdrawFromSavingsActionRow action={handler.action} key={index} {...props} />
          case 'depositToSavings':
            return <DepositToSavingsActionRow action={handler.action} key={index} {...props} />
          case 'upgrade':
            return <UpgradeActionRow action={handler.action} key={index} {...props} />
          case 'downgrade':
            return <DowngradeActionRow action={handler.action} key={index} {...props} />
          case 'stake':
            return <StakeActionRow action={handler.action} key={index} {...props} />
          case 'unstake':
            return <UnstakeActionRow action={handler.action} key={index} {...props} />
          case 'psmConvert':
            return <PsmConvertActionRow action={handler.action} key={index} {...props} />
          case 'claimFarmRewards':
            return <ClaimFarmRewardsActionRow action={handler.action} key={index} {...props} />
          default:
            assertNever(handler.action)
        }
      })}
    </div>
  )
}
