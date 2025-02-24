import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { CardLabelValue, CardSection } from '@/astaria/components/Card'
import { Percent } from '@/astaria/components/Percent'
import { type LendIntent } from '@/astaria/types-internal/intent-schemas'

export const LendIntentDetails = ({
  lendIntent,
  skeleton,
}: {
  lendIntent?: LendIntent
  skeleton?: boolean
}) => (
  <CardSection>
    <CardLabelValue
      label="Willing to lend"
      value={<AssetDisplay asset={lendIntent?.borrow} className="font-medium text-2xl" skeleton={skeleton} />}
    />
    <div className="mt-2 flex items-center justify-between gap-3">
      <CardLabelValue
        label="APY"
        orientation="horizontal"
        value={
          <Percent
            className="font-semibold"
            decimals={lendIntent?.borrow.decimals}
            percent={lendIntent ? lendIntent.minAPY : 0n}
            skeleton={skeleton}
          />
        }
      />
    </div>
  </CardSection>
)
