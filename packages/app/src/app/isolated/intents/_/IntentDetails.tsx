import { BorrowIntentDetails } from '@/app/isolated/intents/_/BorrowIntentDetails'
import { LendIntentDetails } from '@/app/isolated/intents/_/LendIntentDetails'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { CardLabelValue, CardSection } from '@/astaria/components/Card'
import { FillIntentBonusPoints } from '@/astaria/components/FillIntentBonusPoints'
import { LTV } from '@/astaria/components/LTV'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { Tooltip } from '@/astaria/components/Tooltip'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { isLendIntent } from '@/astaria/utils/intentStates'

import { isERC20Asset } from 'assets'

export const IntentDetails = ({
  highPrecision,
  intent,
  isArchived,
  skeleton,
}: {
  highPrecision?: boolean
  intent?: BorrowIntent | LendIntent
  isArchived?: boolean
  skeleton?: boolean
}) => (
  <>
    {intent && isLendIntent(intent) ? (
      <LendIntentDetails lendIntent={intent} skeleton={skeleton} />
    ) : (
      <BorrowIntentDetails borrowIntent={intent} skeleton={skeleton} />
    )}
    <CardSection>
      <AssetDisplay
        asset={intent?.collateral}
        className="font-medium"
        highPrecision={highPrecision}
        skeleton={skeleton}
        triggerExtraWording="collateral"
      />
    </CardSection>
    {intent && isERC20Asset(intent.collateral) ? (
      <CardSection>
        <CardLabelValue
          label={<Tooltip content="Loan To Value" trigger="LTV" underline />}
          orientation="horizontal"
          value={
            <LTV
              borrowAmount={intent.borrow.amount}
              borrowAsset={intent.borrow}
              className="font-semibold"
              collateralAmount={intent.collateral.amount}
              collateralAsset={intent.collateral}
            />
          }
        />
      </CardSection>
    ) : null}
    {!isArchived ? (
      <CardSection>
        <TimeLeft endSeconds={intent?.deadline || 0n} skeleton={skeleton}>
          remaining
        </TimeLeft>
      </CardSection>
    ) : null}
    <CardSection>
      <FillIntentBonusPoints className="font-mono" intent={intent} skeleton={skeleton} /> bonus points
    </CardSection>
  </>
)
