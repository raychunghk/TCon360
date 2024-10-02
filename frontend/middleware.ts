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
import { getMySession } from './app/lib/auth-action';

export async function middleware(request: NextRequest) {


  const { pathname } = request.nextUrl;

  // Exclude static files and Next.js internal paths
  if (pathname.match('(/_next)|(/api)') || pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg|css)$/)) {
    return NextResponse.next();
  }

  // Check if the path is not the login page
  if (!/\/auth\/login\/?$/.test(pathname)) {
    console.log('is login path')
    const sess = await getMySession();

    if (!sess) {
      const loginUrl = new URL(`${feconfig.basepath}/auth/login`, request.url);
       return NextResponse.redirect(loginUrl);
    }
  }else{
      return NextResponse.next();
  }
  console.log(`Next Request URL: ${request.url}`);
  if (request.url.indexOf(`:${feconfig.frontendport}`) > 0) {
    console.log(`middleware :URL contains port ${feconfig.frontendport}: ${request.url}`);
    //  const updatedUrl = request.nextUrl.clone();
    const updatedUrl = request.url.replace(feconfig.feprefix, '')
    console.log('updated url ', updatedUrl);
    //updatedUrl.port = '2000';
    //return NextResponse.rewrite(updatedUrl);
  } else {
    console.log('normal ');
    //return auth(request, () => NextResponse.next());
  }
  return NextResponse.next();
}
