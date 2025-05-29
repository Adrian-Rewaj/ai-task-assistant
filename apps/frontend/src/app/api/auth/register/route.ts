import { NEXT_API_URL } from '@/src/config/config';
import { NextRequest, NextResponse } from 'next/server';

// example of internal next.js api

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${NEXT_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
