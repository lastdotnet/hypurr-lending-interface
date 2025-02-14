import { USDValueDisplay } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValueDisplay'
import { Card } from '@/astaria/components/Card'
import { TextLink } from '@/astaria/components/TextLink'
import { TopStat } from '@/astaria/components/TopStat'
import { ROUTES } from '@/astaria/constants/routes'

export const QuickInfo = () => {
  const isPending = false // TODO
  const usdValue = 123456789 // TODO
  const activeLoansCount = 3 // TODO

  return (
    <Card>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
        <TopStat
          label="Total amount in vault"
          value={<USDValueDisplay skeleton={isPending} standardDecimals usdValue={usdValue} useDashForZero />}
        />
        <TopStat
          label="Total amount in use"
          value={<USDValueDisplay skeleton={isPending} standardDecimals usdValue={usdValue} useDashForZero />}
        />
        <TopStat label="Active vault loans" value={<TextLink href={ROUTES.LOANS}>{activeLoansCount} loans</TextLink>} />
      </div>
    </Card>
  )
}
