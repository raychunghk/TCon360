import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(`Next Request URL: ${request.url}`);
  return NextResponse.next();
}
