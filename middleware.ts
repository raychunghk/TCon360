// export { default } from "next-auth/middleware"
// console.log('middle!')
// export const config = { matcher: ["/dashboard", "/absproxy/5000/" ] }

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     console.log('middleware:js/NxTime/middleware.ts')
//   return NextResponse.redirect(new URL('/home', request.url))
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '.*',
// }
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
   // const cookies = parseCookies();
   // const token = cookies.token;
   // console.log('middleware token?')
   // console.log(token);
    console.log('middlewarepath name?');
    console.log(pathname);
  } catch (error) {
    console.log('middleware error');
    console.log(error);
  }

  return NextResponse.next();
}

// Custom matcher function
function customMatcher(route: string) {
  // Check if the route does not end with 'api/auth'
  return !(route.indexOf('api/auth') >= 0);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
