import BoxArrowTopRight from '@/ui/assets/box-arrow-top-right.svg'
import MagicWand from '@/ui/assets/magic-wand.svg?url'
import MoreIcon from '@/ui/assets/more-icon.svg?url'
import { Button } from '@/ui/atoms/button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/atoms/dropdown/DropdownMenu'
import { Link } from '@/ui/atoms/link/Link'
import { links } from '@/ui/constants/links'
import { useBreakpoint } from '@/ui/utils/useBreakpoint'
import Image from 'next/image'
import { NavbarActionWrapper } from '../NavbarActionWrapper'
import { BuildInfoItem } from './BuildInfoItem'
import { SettingsDropdownItem } from './SettingsDropdownItem'

export interface SettingsDropdownProps {
  onSandboxModeClick: () => void
  isSandboxEnabled: boolean
}

export function SettingsDropdown({ onSandboxModeClick, isSandboxEnabled }: SettingsDropdownProps) {
  return isSandboxEnabled ? (
    <NavbarActionWrapper label="Other">
      <DropdownWrapper>
        <SettingsDropdownItem onClick={onSandboxModeClick}>
          <SettingsDropdownItem.Title>
            <Image src={MagicWand} className="h-5 w-5 lg:h-3 lg:w-3" alt={''} />
            Sandbox Mode
          </SettingsDropdownItem.Title>
          <SettingsDropdownItem.Content>
            Explore Spark <br /> with unlimited tokens
          </SettingsDropdownItem.Content>
        </SettingsDropdownItem>

        <Link href={links.termsOfUse} external>
          <SettingsDropdownItem>
            <SettingsDropdownItem.Content icon={<BoxArrowTopRight className="h-4 w-4" />}>
              Terms of Service
            </SettingsDropdownItem.Content>
          </SettingsDropdownItem>
        </Link>

        <div>
          <DropdownMenuSeparator />
          <BuildInfoItem />
        </div>
      </DropdownWrapper>
    </NavbarActionWrapper>
  ) : null
}

function DropdownWrapper({ children }: { children: React.ReactNode }) {
  const isMobile = !useBreakpoint('lg')

  if (isMobile) {
    return <div className="flex flex-col gap-4">{children}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="bg-white/10 px-3">
          <Image src={MoreIcon} alt={''} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}
