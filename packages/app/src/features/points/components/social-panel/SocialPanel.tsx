import { assets } from '@/ui/assets'
import { LinkButton } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'

export function SocialPanel() {
  return (
    <Panel.Wrapper className="flex flex-1 items-center px-6 py-7">
      <div className="flex flex-col gap-3">
        <p className="font-medium text-white/50 text-xs">
          Get the latest Hyperliquid and HypurrFi news and alpha by joining our socials. All killer no filler!
        </p>

        <div className="flex items-center gap-2">
          <LinkButton
            href="https://x.com/hypurrfi"
            target="_blank"
            rel="noopener noreferrer"
            external
            size="sm"
            className="flex flex-1 gap-2 font-bold text-xs"
          >
            <assets.socialLogos.x className="mr-1 h-4 w-4" /> Follow on X
          </LinkButton>

          <LinkButton
            href="https://x.com/hypurrfi"
            target="_blank"
            rel="noopener noreferrer"
            external
            size="sm"
            className="flex flex-1 gap-2 font-bold text-xs"
          >
            <assets.socialLogos.telegram className="mr-1 h-4 w-4" /> Join Telegram group
          </LinkButton>
        </div>
      </div>
    </Panel.Wrapper>
  )
}
