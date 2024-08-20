//import { NextRequest, NextResponse } from 'next/server';
import { auth as authMiddleware } from '@/auth';
/*
export function middleware(request: NextRequest) {
  console.log(`Next Request URL: ${request.url}`);
  return NextResponse.next();
}
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export function middleware(request: NextRequest) {
  console.log(`Next Request URL: ${request.url}`);
  if (request.url.indexOf(':3000') > 0) {
    console.log(`middleware :URL contains port 3000: ${request.url}`);
    const updatedUrl = request.nextUrl.clone();

    //updatedUrl.port = '2000';
    //return NextResponse.rewrite(updatedUrl);
  } else {
    console.log('normal ');
    //return auth(request, () => NextResponse.next());
  }
  return NextResponse.next();
}
