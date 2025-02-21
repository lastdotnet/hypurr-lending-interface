import { SVGProps, forwardRef } from 'react'

import { Token } from '@/domain/types/Token'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { getTokenImage } from '@/ui/assets'
import Image from 'next/image'

export interface TokenIconProps extends SVGProps<SVGSVGElement> {
  token: Token
}
export const TokenIcon = forwardRef<SVGSVGElement, TokenIconProps>(({ token, ...rest }, ref) => {
  if (token.isAToken) {
    const symbol = TokenSymbol(token.symbol.slice(1))

    return <ATokenIcon symbol={symbol} {...rest} ref={ref} />
  }

  const imageHref = getTokenImage(token.symbol)

  return <Image src={imageHref} alt={''} width="24" height="24" />
})

TokenIcon.displayName = 'TokenIcon'

interface ATokenIconProps extends SVGProps<SVGSVGElement> {
  symbol: TokenSymbol
}
const ATokenIcon = forwardRef<SVGSVGElement, ATokenIconProps>(({ symbol }, _ref) => {
  const imageHref = getTokenImage(symbol)

  return <Image src={imageHref} alt={''} width="24" height="24" />
})

ATokenIcon.displayName = 'ATokenIcon'
