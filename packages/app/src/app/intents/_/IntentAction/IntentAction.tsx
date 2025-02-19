import { useBalance } from 'wagmi'

import { CurrentBorrow } from '@/app/intents/_/CurrentBorrow'
import { CancelIntent } from '@/app/intents/_/IntentAction/CancelIntent'
import { FillIntent } from '@/app/intents/_/IntentAction/FillIntent'
import { RecallBorrowIntent } from '@/app/intents/_/IntentAction/RecallBorrowIntent'
import { type IntentLocation } from '@/app/intents/_/constants'
import { AddWalletAssetsMessage } from '@/astaria/components/AddWalletAssetsMessage'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { Button } from '@/astaria/components/Button'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { Tooltip } from '@/astaria/components/Tooltip'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { addressesAreEqual } from '@/astaria/utils/address'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'
import { getSecondsLeft } from '@/astaria/utils/getSecondsLeft'
import { isBeingRecalled, isLendIntent } from '@/astaria/utils/intentStates'

import { isERC20Asset } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

const ActionAssetDisplay = ({
  intent,
}: {
  intent: BorrowIntent | LendIntent
}) => {
  if (!isLendIntent(intent) && intent.isRecall) {
    return <CurrentBorrow borrowIntentWithRecall={intent} className="whitespace-nowrap text-left" />
  }

  return <AssetDisplay asset={intent.borrow} className="whitespace-nowrap text-left" />
}

export const IntentAction = ({
  intent,
  intentLocation,
  skeleton,
}: {
  intent: BorrowIntent | LendIntent | undefined
  intentLocation: IntentLocation
  skeleton?: boolean
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const { data: balance } = useBalance({
    address,
    chainId: intent?.chainId,
    query: {
      enabled: !!intent && isERC20Asset(intent.collateral),
    },
    token: !!intent && isLendIntent(intent) ? intent?.collateral.address : intent?.borrow.address,
  })

  if (skeleton) {
    return (
      <Button disabled emphasis="medium" fullWidth>
        <SkeletonText />
      </Button>
    )
  }
  if (!intent) {
    return null
  }
  const intentBorrowOrCollateral = isLendIntent(intent) ? intent?.collateral : intent?.borrow

  const userIsOwner = addressesAreEqual(intent?.owner, address)
  const userIsBorrower = isBeingRecalled(intent) && addressesAreEqual(intent?.borrower, address)

  const actionWord = getIntentCopy({ borrow: 'Lend', intent, lend: 'Borrow' })

  if (getSecondsLeft(intent.deadline) <= 0) {
    return null
  }

  if (!address) {
    return (
      <Tooltip
        content={`Connect a wallet to ${actionWord.toLowerCase()}`}
        trigger={
          <Button disabledWithTooltip emphasis="medium" fullWidth size="lg">
            {actionWord}
            <ActionAssetDisplay intent={intent} />
          </Button>
        }
        triggerAsChild
      />
    )
  }

  // Do not allow the user to refinance their own loan
  if (isBeingRecalled(intent) && userIsBorrower) {
    return <div className="text-center">Your recall</div>
  }

  if (!isBeingRecalled(intent) && userIsOwner) {
    return (
      <CancelIntent emphasis="medium" fullWidth intent={intent} intentLocation={intentLocation} size="lg">
        <ActionAssetDisplay intent={intent} />
      </CancelIntent>
    )
  }

  if (isERC20Asset(intentBorrowOrCollateral) && (!balance || balance.value < intentBorrowOrCollateral.amount)) {
    return (
      <Tooltip
        content={
          <AddWalletAssetsMessage
            amountNeeded={intentBorrowOrCollateral.amount}
            balance={balance?.value}
            chainId={intent.chainId}
            decimals={intentBorrowOrCollateral.decimals}
            symbol={intentBorrowOrCollateral.symbol}
          />
        }
        trigger={
          <Button disabledWithTooltip emphasis="medium" fullWidth size="lg">
            {actionWord}
            <ActionAssetDisplay intent={intent} />
          </Button>
        }
        triggerAsChild
      />
    )
  }

  if (isBeingRecalled(intent)) {
    return (
      <RecallBorrowIntent borrowIntentWithRecall={intent} intentLocation={intentLocation} size="lg">
        {actionWord}
        <ActionAssetDisplay intent={intent} />
      </RecallBorrowIntent>
    )
  }

  return (
    <FillIntent intent={intent} intentLocation={intentLocation} size="lg">
      {actionWord}
      <ActionAssetDisplay intent={intent} />
    </FillIntent>
  )
}
