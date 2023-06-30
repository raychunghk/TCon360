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
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;
        console.log('middlewarepath name?')
        console.log(pathname)
    } catch (error) {
        console.log("middleware error")
        console.log(error)
    }


    return NextResponse.next();
}
