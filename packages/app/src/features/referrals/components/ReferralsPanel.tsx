import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { PropsWithChildren } from 'react'
import { assets } from '@/ui/assets'

export function ReferralsPanel({ children }: PropsWithChildren) {
  return (
    <PageLayout className="px-3 lg:px-0">
      <Panel.Wrapper className="flex min-w-full flex-col self-center p-8 md:p-14">
        <div className="mb-16 flex items-center gap-2">
          <Typography variant="h1" gradient className="self-start text-4xl">
            Refer frens and profit
          </Typography>
          <span className="text-4xl">🙀</span>
        </div>

        <div className="mb-8 flex flex-col-reverse items-center justify-between gap-4 rounded-lg bg-white/4 p-2 px-14 pb-10 md:flex-row">
          <div>
            <Typography variant="h2" className="mb-4 text-base md:pt-8">
              How to refer friends
            </Typography>
            <ol className="space-y-2 text-secondary-foreground">
              <li>1. Copy your unique link below</li>
              <li>2. Share it on socials and with friends</li>
              <li>3. Profit from any borrows they make</li>
            </ol>
            <p className="mt-4 text-white/50 text-xs">
              If they don’t connect with this exact link, it can’t be tracked
            </p>
          </div>

          <div className="max-w-80">
            <img src={assets.referralCats} alt="referral cats" className="w-full" />
          </div>
        </div>
        {children}
      </Panel.Wrapper>
    </PageLayout>
  )
}
