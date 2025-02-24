import { MarketAssetStatus } from '@/domain/market-info/reserve-status'
import { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'

export type Variant = 'supply' | 'collateral' | 'borrow' | 'lend' | 'e-mode'

interface HeaderProps {
  status: MarketAssetStatus
  variant: Variant
}

export function Header({ status, variant }: HeaderProps) {
  const { _ } = useLingui()
  return (
    <div className="flex items-center gap-1.5">
      <h4 className="font-normal text-base sm:text-xl">{_(getHeaderText(status, variant))}</h4>
      {/* @todo: Introduce info when copy is available */}
      {/* <Info>Info text</Info> */}
    </div>
  )
}

function getHeaderText(status: MarketAssetStatus, variant: Variant): MessageDescriptor {
  if (variant === 'supply') {
    switch (status) {
      case 'yes':
        return msg`Can be supplied`
      default:
        return msg`Cannot be supplied`
    }
  }

  if (variant === 'collateral') {
    switch (status) {
      case 'yes':
        return msg`Can be used as collateral`
      case 'only-in-isolation-mode':
        return msg`Can be used as collateral in Isolation Mode`
      default:
        return msg`Cannot be used as collateral`
    }
  }

  if (variant === 'borrow') {
    switch (status) {
      case 'yes':
        return msg`Can be borrowed`
      case 'only-in-siloed-mode':
        return msg`Can be borrowed only in Siloed Mode`
      default:
        return msg`Cannot be borrowed`
    }
  }

  if (variant === 'lend') {
    switch (status) {
      case 'yes':
        return msg`Can be lent`
      default:
        return msg`Cannot be lent`
    }
  }

  // variant === 'e-mode'
  switch (status) {
    case 'yes':
      return msg`Can be used in E-Mode`
    default:
      return msg`Cannot be used in E-Mode`
  }
}
