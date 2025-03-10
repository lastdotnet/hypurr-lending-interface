import { paths } from '@/config/paths'
import { TokenWithValue } from '@/domain/common/types'
import { assets } from '@/ui/assets'
import { Button, LinkButton } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { TokenIcon } from '@/ui/atoms/token-icon/TokenIcon'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { useConfettiContext } from '@/ui/molecules/confetti/Confetti'
import { cn } from '@/ui/utils/style'
import { testIds } from '@/ui/utils/testIds'
import { useBreakpoint } from '@/ui/utils/useBreakpoint'
import { useEffect } from 'react'

export interface SuccessViewProps {
  deposited: TokenWithValue[]
  borrowed: TokenWithValue[]
  runConfetti: boolean
  resetForm: () => void
}

export function SuccessView({ deposited, borrowed, runConfetti, resetForm }: SuccessViewProps) {
  const desktop = useBreakpoint('md')
  const { runAnimation } = useConfettiContext()

  useEffect(() => {
    if (runConfetti) {
      runAnimation()
    }
  }, [runConfetti, runAnimation])

  return (
    <PageLayout className={cn('pt-8', desktop && 'pt-28')}>
      <div className="flex flex-col items-center justify-center">
        <img src={assets.success} alt="success-img" />
        <Typography variant={desktop ? 'h1' : 'h3'} className="mt-8 text-center">
          Congrats, all done!
        </Typography>

        <Panel className="mt-8 min-w-full max-w-3xl">
          <Panel.Header>
            <Panel.Title className="text-xl">Summary</Panel.Title>
          </Panel.Header>

          <Panel.Content>
            <div className={cn('mt-4 flex flex-col gap-9', 'md:flex-row')}>
              {deposited.length > 0 && (
                <div className="flex grow flex-col" data-testid={testIds.easyBorrow.success.deposited}>
                  <Typography variant="prompt" className="mb-2 font-semibold text-primary">
                    Deposited
                  </Typography>
                  {deposited.map((tokenWithValue) => (
                    <Item key={tokenWithValue.token.symbol} {...tokenWithValue} />
                  ))}
                </div>
              )}

              <div className="flex grow flex-col" data-testid={testIds.easyBorrow.success.borrowed}>
                <Typography variant="prompt" className="mb-2 font-semibold text-primary">
                  Borrowed
                </Typography>
                {borrowed.map((tokenWithValue) => (
                  <Item key={tokenWithValue.token.symbol} {...tokenWithValue} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="flex-1 bg-white/10 text-primary" onClick={resetForm} rounded="full">
                Close
              </Button>
              <LinkButton className="flex-1" href={paths.dashboard} rounded="full">
                View in Dashboard
              </LinkButton>
            </div>
          </Panel.Content>
        </Panel>
      </div>
    </PageLayout>
  )
}

function Item({ token, value }: TokenWithValue) {
  return (
    <div className="flex items-center border-t">
      <TokenIcon token={token} className="h-6 w-6" />

      <Typography className="ml-2 font-primary">{token.symbol}</Typography>

      <div className="flex grow flex-col py-3 pr-4">
        <Typography className="text-right font-primary">{token.format(value, { style: 'auto' })}</Typography>
        <Typography variant="prompt" className="text-right">
          {token.formatUSD(value)}
        </Typography>
      </div>
    </div>
  )
}
