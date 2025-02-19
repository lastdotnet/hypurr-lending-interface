import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isTestnet } from './config/consts'

export function middleware(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === '/faucet' && !isTestnet) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/faucet',
}
