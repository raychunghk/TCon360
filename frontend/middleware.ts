//import { NextRequest, NextResponse } from 'next/server';
/*
export function middleware(request: NextRequest) {
  console.log(`Next Request URL: ${request.url}`);
  return NextResponse.next();
}
 */
import { NextRequest, NextResponse } from 'next/server';
import { getMySession } from './app/lib/auth-action';
///import { default as config } from './frontendconfig';
import { config } from '@tcon360/config';

export async function middleware(request: NextRequest) {


  const { pathname } = request.nextUrl;

  // Exclude static files and Next.js internal paths
  if (pathname.match('(/_next)|(/api)') || pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg|css)$/)) {
    console.log(`pathname:${pathname}`);
    return NextResponse.next();
  }

  // Check if the path is not the login page
  if (!/\/auth\/login\/?$/.test(pathname)) {
    console.log('is not login path, pathname', pathname)
    const sess = await getMySession();
    console.log('Middleware session check', sess)
    if (!sess) {
      console.log('Middleware session check', 'session not available!');
      const loginUrl = new URL(`${config.basepath}/auth/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    return NextResponse.next();
  }
  console.log(`Next Request URL: ${request.url}`);
  if (request.url.indexOf(`:${config.frontendport}`) > 0) {
    console.log(`middleware :URL contains port ${config.frontendport}: ${request.url}`);
    //  const updatedUrl = request.nextUrl.clone();
    const updatedUrl = request.url.replace(config.feprefix, '')
    console.log('updated url ', updatedUrl);
    //updatedUrl.port = '2000';
    //return NextResponse.rewrite(updatedUrl);
  } else {
    console.log('normal ');
    //return auth(request, () => NextResponse.next());
  }
  return NextResponse.next();
}
