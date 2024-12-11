import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { PropsWithChildren } from 'react'
import { assets } from '@/ui/assets'

export function FaucetPanel({ children }: PropsWithChildren) {
  return (
    <PageLayout>
      <Panel.Wrapper className="flex min-w-full max-w-3xl flex-col self-center p-8 md:p-14">
        <Typography variant="h1" className="text-3xl text-primary-bg">
          Testnet Token Faucet
        </Typography>

        <div className="mt-2 mb-8">
          <p className="text-secondary-foreground">
            Get test tokens to explore and interact with our protocol on testnet. These tokens are for testing purposes
            only and have no real value.
          </p>
        </div>

        <div className="mb-8 flex flex-col-reverse justify-between gap-8 rounded-lg bg-white/4 p-2 px-14 pb-10 md:flex-row">
          <div>
            <Typography variant="h2" className="mb-3 text-2xl md:pt-8">
              How to use the faucet
            </Typography>
            <ol className="space-y-2 text-secondary-foreground">
              <li>1. Connect your wallet to the testnet</li>
              <li>2. Click "Mint" to receive your test tokens</li>
              <li>3. Use your tokens to explore the app</li>
            </ol>
            <p className="mt-4 text-white/50 text-xs">There is a 24-hour cooldown period between mints.</p>
          </div>

          <div className="max-w-56">
            <img src={assets.catFaucet} alt="cat faucet" />
          </div>
        </div>
        {children}
      </Panel.Wrapper>
    </PageLayout>
  )
}
