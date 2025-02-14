import { type NextRequest, NextResponse } from 'next/server'

import { StatusCodes } from 'http-status-codes'

import { ENV } from '@/astaria/constants/environment'

export const GET = async (request: NextRequest) => {
  const searchParams = request?.nextUrl.searchParams
  const email = searchParams.get('email')
  if (!searchParams || !email || typeof email !== 'string') {
    return NextResponse.json(
      {
        data: {
          msg: 'Please add your email.',
          result: 'error',
        },
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  try {
    const emailURI = encodeURIComponent(email)

    // NOTE: request must be in this EXACT format, url + headers
    // must be sent as-is in order for this to work:
    const response = await fetch(`${ENV.NEXT_PUBLIC_MAILCHIMP_URL}&EMAIL=${emailURI}`, {
      body: null,
      credentials: 'include',
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
      },
      method: 'GET',
      mode: 'cors',
      referrer: 'https://astaria.xyz/',
      referrerPolicy: 'strict-origin-when-cross-origin',
    })

    // NOTE: The response uses JSONP, so we have to parse the JSON
    // string from body using response.text()
    const text = await response.text()
    const data = JSON.parse(text)

    if (data?.result !== 'success') {
      console.error('Mailchimp error, email: ', emailURI)
      return NextResponse.json(
        {
          data,
          success: false,
        },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    // We return the data from the response, which includes the
    // status of the request, and the message from Mailchimp.
    return NextResponse.json(
      {
        data,
        success: true,
      },
      { status: StatusCodes.CREATED },
    )
  } catch (error) {
    console.error(error)
    console.error('Mailchimp proxy error, email: ', email)

    return NextResponse.json(
      {
        data: {
          msg: 'Please confirm your email and try again.',
          result: 'error',
        },
        success: false,
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    )
  }
}
