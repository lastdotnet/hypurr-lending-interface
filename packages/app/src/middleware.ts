import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest): NextResponse {
  const isTestnet = process.env.NEXT_PUBLIC_SHOW_TESTNET === '1'

  if (request.nextUrl.pathname === '/faucet' && !isTestnet) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/faucet',
}
