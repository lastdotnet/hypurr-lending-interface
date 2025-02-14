import { type NextRequest, type NextResponse } from 'next/server'

import { StatusCodes } from 'http-status-codes'

import { jsonResponse } from '@/app/api/_/jsonResponse'
import { trackInternalWarning } from '@/astaria/utils/trackInternalWarning'

const notifyError = async (req: NextRequest, error: Error) => {
  const url = new URL(req.url)
  // send warning only for cron jobs
  if (url.pathname.startsWith('/api/cron/')) {
    return trackInternalWarning({
      description: `Cron job "${url.pathname}" failed`,
      title: 'Cron Job Error',
      trace: error.stack,
      values: {
        errorMessage: error.message,
        errorName: error.name,
        url: req.url,
      },
    })
  }
}

export { StatusCodes }

export async function handleErrors(req: NextRequest, fn: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await fn()
  } catch (error) {
    await notifyError(req, error as Error)
    if (error instanceof ServerError) {
      return error.response()
    }

    console.error(`Unhandled server error: ${JSON.stringify(error)}; req: ${JSON.stringify(req)}`)

    if (error instanceof Error) {
      return new InternalServerError(error.message).response()
    }

    return new InternalServerError().response()
  }
}

export class ServerError extends Error {
  readonly status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
  response(): NextResponse {
    return jsonResponse({ message: this.message }, { status: this.status })
  }
}

export class BadRequestError extends ServerError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message)
  }
}

export class InternalServerError extends ServerError {
  constructor(message?: string | undefined) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message || 'Internal Server Error')
  }
}
export class UnauthorizedError extends ServerError {
  constructor(message?: string | undefined) {
    super(StatusCodes.UNAUTHORIZED, message || 'Unauthorized')
  }
}
