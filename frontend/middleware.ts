export const runtime = 'nodejs';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '@tcon360/config';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './app/lib/auth';
import { getMySession } from './app/lib/auth-action';
// Utility function to format logs with timestamp and context
const logMiddleware = (description: string, details: any = {}) => {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(`🔀[Middleware][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

export async function middleware(request: NextRequest) {
  const { pathname, href } = request.nextUrl;

  // Log request details
  if (!pathname.startsWith('/_next')) {
    logMiddleware('Processing request', {
      url: href,
      pathname,
    });
  }

  // Exclude static files, Next.js internal paths, BetterAuth routes, and backend API routes
  if (pathname.startsWith('/api/bauth')) {
    logMiddleware('Skipping: BetterAuth route', { pathname });
    return NextResponse.next();
  }
  // Exclude all other /api/ routes EXCEPT our health check poller
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/betterhealth')) {
    logMiddleware('Skipping: Backend API route, expecting rewrite to Nest.js', {
      pathname,
      backendPort: config.backendport,
    });
    return NextResponse.next();
  }
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }
  if (pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg)$/)) {
    return NextResponse.next();
  }

  // Check if the path is not an auth page (login or signup)
  if (!pathname.startsWith('/auth/login') && !pathname.startsWith('/signup') && !pathname.startsWith('/test-auth')) {
    logMiddleware('🔀Checking session for non-login path', { pathname });

    if (config.useBetterAuth) {
      logMiddleware('Using BetterAuth for session check');

      // Log current time before session check
      const now = new Date();
      logMiddleware('Current time before session check', { now: now.toISOString() });

      // Log incoming cookie header for debugging
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, ...valueParts] = cookie.trim().split('=');
          if (key) {
            const value = valueParts.join('=');
            const maxLength = 100;
            acc[key] = value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
          }
          return acc;
        }, {} as Record<string, string>);
        logMiddleware('📥 Incoming cookies (trimmed)', { cookies });
      } else {
        logMiddleware('📥 No cookies in request header');
      }

      // Primary: Try Better Auth's native session
      const session = await auth.api.getSession({
        headers: Object.fromEntries(request.headers.entries()),
        query: { disableCookieCache: false },
      });

      if (!session) {
        const sessionNullTime = new Date();
        const loginSuccessTime = request.cookies.get('login_success_time')?.value;
        let firstSessionNullTime = request.cookies.get('first_session_null_time')?.value;

        // Prepare a response object to potentially set a cookie
        const response = NextResponse.next();

        // If this is the first time we see a null session, record the time in a cookie.
        if (!firstSessionNullTime) {
          firstSessionNullTime = sessionNullTime.toISOString();
          response.cookies.set('first_session_null_time', firstSessionNullTime, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // Persist for debugging
          });
        }

        const timeSinceLoginMs = loginSuccessTime
          ? sessionNullTime.getTime() - new Date(loginSuccessTime).getTime()
          : 'N/A';

        logMiddleware('🔴 BetterAuth session is NULL', {
          loginSuccessAt: loginSuccessTime || 'Not found',
          firstSessionNullAt: firstSessionNullTime,
          timeSinceLoginToFirstNullMs: timeSinceLoginMs,
        });
        // Note: We must continue the middleware chain from here.
        // The logic below will handle the redirect.
      }

      if (session?.user) {
        if (session.session?.expiresAt) {
          const expiresAt = new Date(session.session.expiresAt);
          const timeUntilExpiryMs = expiresAt.getTime() - now.getTime();

          logMiddleware('🕵️BetterAuth session accepted', {
            userId: session.user.id,
            email: session.user.email,
            expiresAt: session.session.expiresAt,
            timeUntilExpiryMs,
            isExpired: timeUntilExpiryMs <= 0,
          });
        } else {
          logMiddleware('BetterAuth session accepted (no expiry data)', {
            userId: session.user.id,
            email: session.user.email,
          });
        }

        return NextResponse.next();
      }

      logMiddleware('🔴 BetterAuth session is null or invalid – falling back to NestJS /api/user/myuser');

      // Fallback: Extract NestJS token from cookie (stored as 'token' during login)
      const nestToken = request.cookies.get('token')?.value;

      if (!nestToken) {
        logMiddleware('No NestJS token found in cookies – redirecting to login');
        const loginUrl = new URL(`${config.basepath}/auth/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Build the full NestJS backend URL
      const myUserUrl = `http://localhost:${config.backendport}/api/user/myuser`;

      logMiddleware('Calling NestJS /api/user/myuser for session validation', {
        url: myUserUrl,
        tokenPreview: nestToken.substring(0, 20) + '...',
      });

      // Call protected NestJS endpoint
      const myUserRes = await fetch(myUserUrl, {
        headers: {
          Authorization: `Bearer ${nestToken}`,
          Cookie: request.headers.get('cookie') || '',
        },
      });

      if (myUserRes.ok) {
        const userData = await myUserRes.json();
        logMiddleware('NestJS /api/user/myuser validated session successfully', {
          userId: userData.id,
          email: userData.email,
          staffCount: userData.staff?.length || 0,
        });

        // Session is valid → allow request to proceed
        return NextResponse.next();
      }

      logMiddleware('NestJS /api/user/myuser failed – invalid or expired token', {
        status: myUserRes.status,
        statusText: myUserRes.statusText,
      });

      // Invalid token → redirect to login
      const loginUrl = new URL(`${config.basepath}/auth/login`, request.url);
      return NextResponse.redirect(loginUrl);
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
