import { NextResponse } from 'next/server';

export const jsonResponse = <Body = unknown>(body: Body, init?: ResponseInit) =>
  new NextResponse(
    JSON.stringify(body, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ),
    {
      ...init,
      headers: { ...init?.headers, 'Content-Type': 'application/json' },
    }
  );
