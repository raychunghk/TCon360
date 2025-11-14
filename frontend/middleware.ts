/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth';
import { config } from '@tcon360/config';
import { NextRequest, NextResponse } from 'next/server';

// Utility function to format logs with timestamp and context
const logMiddleware = (description: string, details: any = {}) => {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(`[Middleware][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

export async function middleware(request: NextRequest) {
  const { pathname, href, } = request.nextUrl;

  // Log request details
  logMiddleware('Processing request', {

    url: href,
    pathname,
    headers: Object.fromEntries(request.headers.entries()),
  });

  // Exclude static files, Next.js internal paths, NextAuth routes, and backend API routes
  if (pathname.startsWith('/api/auth')) {
    logMiddleware('Skipping: NextAuth route', { pathname });
    return NextResponse.next();
  }
  if (pathname.startsWith('/api/')) {
    logMiddleware('Skipping: Backend API route, expecting rewrite to Nest.js', {
      pathname,
      backendPort: config.backendport,
    });
    return NextResponse.next();
  }
  if (pathname.match(/^\/_next\//)) {
    logMiddleware('Skipping: Next.js internal path', { pathname });
    return NextResponse.next();
  }
  if (pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg)$/)) {
    logMiddleware('Skipping: Static file', { pathname });
    return NextResponse.next();
  }

  // Check if the path is not the login page
  if (!/\/auth\/login\/?$/.test(pathname)) {
    logMiddleware('Checking session for non-login path', { pathname });
    const session = await auth();
    if (!session?.user) {
      logMiddleware('No valid session, redirecting to login', {
        pathname,
        session: session || null,
      });
      const loginUrl = new URL(`${config.basepath}/auth/login`, request.url);
      logMiddleware('Redirecting to login URL', { loginUrl: loginUrl.toString() });
      return NextResponse.redirect(loginUrl);
    }
    logMiddleware('Valid session found', {
      user: session.user,
      expires: session.expires,
    });
  } else {
    logMiddleware('Allowing login page access', { pathname });
    return NextResponse.next();
  }

  // Handle URL rewriting for port-specific paths (optional, kept for compatibility)
  if (request.url.includes(`:${config.frontendport}`)) {
    logMiddleware('URL contains frontend port, attempting rewrite', {
      url: request.url,
      frontendport: config.frontendport,
      feprefix: config.feprefix,
    });
    const updatedUrl = request.url.replace(config.feprefix, '');
    logMiddleware('Rewritten URL', { original: request.url, updated: updatedUrl });
    // Optionally rewrite to updated URL (uncomment if needed)
    // return NextResponse.rewrite(new URL(updatedUrl));
  } else {
    logMiddleware('No port-specific URL rewriting needed', { url: request.url });
  }

  logMiddleware('Allowing request to proceed', { pathname });
  return NextResponse.next();
}