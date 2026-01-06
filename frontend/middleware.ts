export const runtime = 'nodejs';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '@tcon360/config';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './app/lib/auth';
import { getMySession } from './app/lib/auth-action';

// Utility function to format logs with timestamp and context
const logMiddleware = (description: string, details: any = {}) => {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(`[Middleware][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

export async function middleware(request: NextRequest) {
  const { pathname, href } = request.nextUrl;

  // Log request details
  logMiddleware('Processing request', {
    url: href,
    pathname,
  });

  // Exclude static files, Next.js internal paths, BetterAuth routes, and backend API routes
  if (pathname.startsWith('/api/bauth')) {
    logMiddleware('Skipping: BetterAuth route', { pathname });
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
    return NextResponse.next();
  }
  if (pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg)$/)) {
    return NextResponse.next();
  }

  // Check if the path is not an auth page (login or signup)
  if (!pathname.startsWith('/auth/login') && !pathname.startsWith('/signup') && !pathname.startsWith('/test-auth')) {
    logMiddleware('Checking session for non-login path', { pathname });

    if (config.useBetterAuth) {
      logMiddleware('Using BetterAuth for session check');

      // Pass headers to read the session_token cookie
      const session = await auth.api.getSession({
        headers: Object.fromEntries(request.headers.entries()),
      });

      logMiddleware('Middleware better-auth session check', { session });

      if (!session?.user) {
        logMiddleware('No valid better-auth session, redirecting to login', {
          pathname,
          session: session || null,
        });
        const loginUrl = new URL(`${config.basepath}/auth/login`, request.url);
        logMiddleware('Redirecting to login URL', { loginUrl: loginUrl.toString() });
        return NextResponse.redirect(loginUrl);
      }

      logMiddleware('Valid better-auth session found', {
        userId: session.user.id,
        email: session.user.email,
        expiresAt: session.session.expiresAt,
      });
    } else {
      logMiddleware('Using next-auth for session check');
      const session = await getMySession();
      logMiddleware('Middleware session check', { session });
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
    }
  } else {
    logMiddleware('Allowing login page access', { pathname });
    return NextResponse.next();
  }

  // Optional port-specific URL handling (kept for compatibility)
  if (request.url.includes(`:${config.frontendport}`)) {
    logMiddleware('URL contains frontend port', {
      url: request.url,
      frontendport: config.frontendport,
      feprefix: config.feprefix,
    });
  } else {
    logMiddleware('No port-specific URL handling needed', { url: request.url });
  }

  logMiddleware('Allowing request to proceed', { pathname });
  return NextResponse.next();
}

