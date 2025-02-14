import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

import { createClient } from '@vercel/edge-config'

import { BASE_URL } from '@/astaria/config/config'
import { ENV } from '@/astaria/constants/environment'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|maintenance).*)'],
  unstable_allowDynamic: ['/node_modules/envalid/dist/reporter.js'],
}

const BLOCKED_COUNTRIES = [
  'CU', // Cuba
  'IR', // Iran, Islamic Republic Of
  'KP', // Korea, Democratic People's Republic Of
  'LY', // Libya
  'SS', // South Sudan
  'SD', // Sudan
  'SY', // Syrian Arab Republic
]

const EDGE_CONFIG_URL = process.env.EDGE_CONFIG

const edgeConfig = EDGE_CONFIG_URL ? createClient(EDGE_CONFIG_URL) : null

export async function middleware(req: NextRequest) {
  const country = req?.headers.get('X-Vercel-IP-Country') ?? 'US'

  if (
    req.url.startsWith(BASE_URL) &&
    ENV.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
    BLOCKED_COUNTRIES.includes(country)
  ) {
    req.nextUrl.pathname = '/restricted'

    return NextResponse.rewrite(req.nextUrl)
  }
  if (
    req.nextUrl.pathname === '/restricted' &&
    ENV.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
    !BLOCKED_COUNTRIES.includes(country)
  ) {
    req.nextUrl.pathname = '/'

    return NextResponse.rewrite(req.nextUrl)
  }

  const isInMaintenanceMode = (await edgeConfig?.get<boolean>('isInMaintenanceMode')) ?? false
  if (ENV.NEXT_PUBLIC_VERCEL_ENV === 'production' && isInMaintenanceMode && !ENV.NEXT_PUBLIC_IGNORE_MAINTENANCE) {
    req.nextUrl.pathname = '/maintenance'

    return NextResponse.rewrite(req.nextUrl)
  }
  if (req.nextUrl.pathname === '/maintenance' && ENV.NEXT_PUBLIC_VERCEL_ENV === 'production' && !isInMaintenanceMode) {
    req.nextUrl.pathname = '/'

    return NextResponse.rewrite(req.nextUrl)
  }

  return NextResponse.next()
}
