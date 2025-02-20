import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { USDXL_ADDRESS } from '@/config/consts'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { zeroAddress } from 'viem'

export function getBorrowableAmount({
  tokenIdentifier,
  facilitatorAvailable,
  defaultAvailable,
}: {
  tokenIdentifier: TokenSymbol | CheckedAddress
  facilitatorAvailable: NormalizedUnitNumber
  defaultAvailable: NormalizedUnitNumber
}): NormalizedUnitNumber {
  const isUSDXL = isAddress(tokenIdentifier)
    ? tokenIdentifier === USDXL_ADDRESS && tokenIdentifier !== CheckedAddress(zeroAddress)
    : tokenIdentifier === TokenSymbol('USDXL')

  return isUSDXL ? facilitatorAvailable : defaultAvailable
}

function isAddress(value: TokenSymbol | CheckedAddress): value is CheckedAddress {
  return (value as string).startsWith('0x')
}
