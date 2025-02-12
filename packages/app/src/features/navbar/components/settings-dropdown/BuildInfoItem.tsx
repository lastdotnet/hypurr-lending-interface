import { LinkDecorator } from '@/ui/atoms/link-decorator/LinkDecorator'
import { links } from '@/ui/constants/links'

import { SettingsDropdownItem } from './SettingsDropdownItem'

export function BuildInfoItem() {
  const buildSha =
    process.env.STORYBOOK_PREVIEW || process.env.NEXT_PUBLIC_BUILD_SHA === undefined
      ? 'n/a'
      : process.env.NEXT_PUBLIC_BUILD_SHA
  const buildTime =
    process.env.STORYBOOK_PREVIEW || process.env.NEXT_PUBLIC_BUILD_TIME === undefined
      ? 'n/a'
      : process.env.NEXT_PUBLIC_BUILD_TIME

  return (
    <LinkDecorator to={links.social.github} external>
      <SettingsDropdownItem variant="footnote">
        <div className="flex flex-row items-center gap-1 text-[9px]">
          Built from {buildSha} at {buildTime}
        </div>
      </SettingsDropdownItem>
    </LinkDecorator>
  )
}
