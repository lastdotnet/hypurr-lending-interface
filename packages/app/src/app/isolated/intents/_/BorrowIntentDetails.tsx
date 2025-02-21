import { XShareButton } from '@/app/isolated/intents/_/IntentCard/XShareButton'
import { ERC20Display } from '@/astaria/components/AssetDisplay/ERC20Display'
import { CardLabelValue, CardSection } from '@/astaria/components/Card'
import { CurrentBorrowAPY } from '@/astaria/components/CurrentBorrowAPY'
import { Percent } from '@/astaria/components/Percent'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { type BorrowIntent } from '@/astaria/types-internal/intent-schemas'

export const BorrowIntentDetails = ({
  borrowIntent,
  highPrecision,
  skeleton,
}: {
  borrowIntent?: BorrowIntent
  highPrecision?: boolean
  skeleton?: boolean
}) => (
  <CardSection>
    <div className="flex justify-between">
      <CardLabelValue
        label="Asking to borrow"
        value={
          <ERC20Display
            className="text-2xl font-medium"
            erc20={borrowIntent?.borrow}
            highPrecision={highPrecision}
            skeleton={skeleton}
          />
        }
      />
      <XShareButton intent={borrowIntent} skeleton={skeleton} />
    </div>
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
        value={<CurrentBorrowAPY borrowIntent={borrowIntent} className="font-semibold" skeleton={skeleton} />}
      />
      <CardLabelValue
        className="text-right"
        label="Max"
        orientation="horizontal"
        value={
          <Percent
            className="font-semibold"
            decimals={borrowIntent?.borrow.decimals}
            percent={borrowIntent ? borrowIntent.endRate : 0n}
            skeleton={skeleton}
          />
        }
      />
    </div>
  </CardSection>
)
