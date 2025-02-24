import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { PropsWithChildren } from 'react'
import { assets } from '@/ui/assets'
import { isTestnet } from '@/config/consts'
import { Trans } from '@lingui/react/macro'

export function FaucetPanel({ children }: PropsWithChildren) {
  return (
    <PageLayout className="px-3 lg:px-0">
      <Panel.Wrapper className="flex min-w-full flex-col self-center p-6 md:p-14">
        <div className="mb-16 flex items-center gap-2">
          <Typography variant="h1" gradient className="self-start text-4xl">
            <Trans>Testnet Token Faucet</Trans> <span className="text-4xl text-white">🚰</span>
          </Typography>
        </div>

        <div className="mb-8 flex flex-col-reverse items-center justify-between gap-8 rounded-lg bg-white/4 p-2 px-6 pb-10 md:flex-row md:px-14">
          {isTestnet ? (
            <>
              <div>
                <Typography variant="h2" className="mb-4 text-base md:pt-8">
                  <Trans>How to use the faucet</Trans>
                </Typography>
                <ol className="space-y-2 text-secondary-foreground">
                  <li>
                    <Trans>1. Connect your wallet to the testnet</Trans>
                  </li>
                  <li>
                    <Trans>2. Click "Mint" to receive your test tokens</Trans>
                  </li>
                  <li>
                    <Trans>3. Use your tokens to explore the app</Trans>
                  </li>
                </ol>
                <p className="mt-4 text-white/50 text-xs">
                  <Trans>There is a 24-hour cooldown period between mints.</Trans>
                </p>
              </div>

              <div className="max-w-80">
                <img src={assets.faucetPurr} alt="cat faucet" className="w-full" />
              </div>
            </>
          ) : (
            <RedirectNotice />
          )}
        </div>
        {isTestnet && children}
      </Panel.Wrapper>
    </PageLayout>
  )
}

function RedirectNotice() {
  return (
    <Typography className="text-base md:pt-8">
      <Trans>
        Faucet is not available on mainnet. To mint testnet tokens, please visit{' '}
        <a href="https://dev.hypurr.fi/faucet" target="_blank" rel="noopener" className="text-primary underline">
          our testnet app
        </a>
        .
      </Trans>
    </Typography>
  )
}
