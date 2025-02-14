import { DetailsDisplayTooltip } from '@/astaria/components/DetailsDisplayTooltip'
import { shorten } from '@/astaria/utils/shorten'

export const AddressShort = ({
  address,
  className,
}: {
  address?: string
  className?: string
}) => {
  if (!address) {
    return null
  }
  return <DetailsDisplayTooltip className={className} content={address} trigger={shorten({ value: address })} />
}
