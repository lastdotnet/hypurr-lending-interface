import { CurrentBorrow } from '@/app/isolated/intents/_/CurrentBorrow'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { ERC20Display } from '@/astaria/components/AssetDisplay/ERC20Display'
import { Card, CardLabelValue, CardSection } from '@/astaria/components/Card'
import { ChainLogo } from '@/astaria/components/ChainLogo'
import { CurrentBorrowAPY } from '@/astaria/components/CurrentBorrowAPY'
import { Percent } from '@/astaria/components/Percent'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { type BorrowIntent, type LendIntent } from '@/astaria/types-internal/intent-schemas'
import { getIntentCopy } from '@/astaria/utils/getIntentCopy'
import { isBeingRecalled, isLendIntent } from '@/astaria/utils/intentStates'

export const FillIntentContent = ({
  intent,
}: {
  intent: BorrowIntent | LendIntent
}) => (
  <Card receiptStyle>
    <CardSection>
      <div className="relative">
        <ChainLogo chainId={intent.chainId} className="absolute right-0 top-0" height="32" width="32" />
      </div>
      <CardLabelValue
        label={getIntentCopy({ borrow: 'Lending', intent, lend: 'Borrowing' })}
        orientation="vertical"
        value={
          isBeingRecalled(intent) ? (
            <CurrentBorrow borrowIntentWithRecall={intent} className="text-2xl font-medium" linkAssetToBlockExplorer />
          ) : (
            <ERC20Display
              className="text-2xl font-medium"
              erc20={intent.borrow}
              highPrecision
              linkAssetToBlockExplorer
            />
          )
        }
      />
      {isLendIntent(intent) ? (
        <CardLabelValue
          className="mt-2"
          label="APY"
          orientation="horizontal"
          value={<Percent decimals={intent.borrow.decimals} percent={intent.minAPY} />}
        />
      ) : (
        <div className="mt-2 flex items-center justify-between gap-3">
          <CardLabelValue
            label="APY"
            orientation="horizontal"
            tooltip={
              <Popover>
                <PopoverInfoTrigger />
                <PopoverContent>
                  <p>During the intent window, your asking APY begins at 0% and increases to the maximum over time.</p>
                  <p>This APY would be used if the intent was filled now.</p>
                </PopoverContent>
              </Popover>
            }
            value={<CurrentBorrowAPY borrowIntent={intent} className="font-semibold" />}
          />
          <CardLabelValue
            className="text-right"
            label="Max"
            orientation="horizontal"
            value={<Percent className="font-semibold" decimals={intent.borrow.decimals} percent={intent.endRate} />}
          />
        </div>
      )}
    </CardSection>
    <CardSection>
      <AssetDisplay
        asset={intent.collateral}
        className="font-medium"
        highPrecision
        linkAssetToBlockExplorer
        triggerExtraWording="collateral"
      />
    </CardSection>
    <CardSection>
      <TimeLeft endSeconds={intent.deadline || 0n}>remaining</TimeLeft>
    </CardSection>
  </Card>
)
