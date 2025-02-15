import { paths } from '@/config/paths'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { getTokenImage } from '@/ui/assets'
import { buttonVariants, LinkButton } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { IconStack } from '@/ui/molecules/icon-stack/IconStack'
import { cn } from '@/ui/utils/style'

const TOKEN_ICON_PATHS = ['HYPE', 'USDC', 'SolvBTC', 'sUSDe'].map(TokenSymbol).map(getTokenImage)

interface CreatePositionPanelProps {
  className?: string
}

export function CreatePositionPanel({ className }: CreatePositionPanelProps) {
  return (
    <Panel.Wrapper className={className}>
      <Panel.Content className="flex flex-col gap-6 p-6 text-center md:px-8">
        <div className="flex flex-col items-center gap-6">
          <IconStack paths={TOKEN_ICON_PATHS} size="lg" stackingOrder="first-on-top" />
          <Typography variant="p" className="font-semibold sm:text-2xl">
            Quickly deposit your assets and borrow with our Easy Borrow Flow
          </Typography>
        </div>
        <LinkButton className={cn(buttonVariants({ rounded: 'full' }))} href={paths.easyBorrow}>
          Create position
        </LinkButton>
      </Panel.Content>
    </Panel.Wrapper>
  )
}
