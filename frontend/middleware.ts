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
import { default as feconfig } from './frontendconfig';

export function middleware(request: NextRequest) {
  console.log(`Next Request URL: ${request.url}`);
  if (request.url.indexOf(`:${feconfig.frontendport}`) > 0) {
    console.log(`middleware :URL contains port ${feconfig.frontendport}: ${request.url}`);
  //  const updatedUrl = request.nextUrl.clone();
  const updatedUrl = request.url.replace(feconfig.feprefix, '')
    console.log('updated url ',updatedUrl);
    //updatedUrl.port = '2000';
    //return NextResponse.rewrite(updatedUrl);
  } else {
    console.log('normal ');
    //return auth(request, () => NextResponse.next());
  }
  return NextResponse.next();
}
