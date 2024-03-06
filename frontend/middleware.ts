import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(`Request URL: ${request.url}`);
  return NextResponse.next();
}
