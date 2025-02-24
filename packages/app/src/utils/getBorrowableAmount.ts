import { USDXL_ADDRESS } from '@/config/consts'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
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
