import { type NextRequest, NextResponse } from 'next/server'

import { StatusCodes } from 'http-status-codes'

import { formatNotifications } from '@/app/api/notifications/_/formatNotification'

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const encoded = body.encoded
  const symKey = body.symKey
  if (!encoded || typeof encoded !== 'string' || !symKey || typeof symKey !== 'string') {
    return NextResponse.json({
      status: StatusCodes.BAD_REQUEST,
    })
  }

  try {
    const result = formatNotifications({
      encoded,
      symKey,
    })

    return NextResponse.json({ data: result }, { status: StatusCodes.OK })
  } catch (error) {
    return NextResponse.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
