import { type NextRequest, NextResponse } from 'next/server'

import { StatusCodes } from 'http-status-codes'

export const POST = async (request: NextRequest) => {
  if (!['preview', 'production'].includes(process.env?.VERCEL_ENV ?? '')) {
    return NextResponse.json(
      {
        data: {
          msg: 'Invalid environment.',
          result: 'error',
        },
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  if (request.headers.get('content-type') !== 'application/csp-report') {
    return NextResponse.json(
      {
        data: {
          msg: 'Invalid Content-Type.',
          result: 'error',
        },
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  const report = await request.json()

  // Example data:
  // {
  //   "csp-report": {
  //     "blocked-uri": "http://example.com/css/style.css",
  //     "disposition": "report",
  //     "document-uri": "http://example.com/signup.html",
  //     "effective-directive": "style-src-elem",
  //     "original-policy": "default-src 'none'; style-src cdn.example.com; report-to /_/csp-reports",
  //     "referrer": "",
  //     "status-code": 200,
  //     "violated-directive": "style-src-elem"
  //   }
  // }

  // Send the report to Slack temporary channel
  await fetch('https://hooks.slack.com/services/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', {
    body: JSON.stringify(
      // eslint-disable-next-line no-magic-numbers
      { text: `\`\`\`${JSON.stringify(report, null, 2)}\`\`\`` },
      null,
      // eslint-disable-next-line no-magic-numbers
      2,
    ),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  })

  return NextResponse.json(
    {
      data: {
        msg: 'CSP report received.',
        result: 'success',
      },
      success: true,
    },
    { status: StatusCodes.OK },
  )
}
