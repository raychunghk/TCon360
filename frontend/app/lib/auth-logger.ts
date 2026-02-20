// app/lib/auth-logger.ts
// Logging utility functions for BetterAuth OAuth flow debugging
import { NextRequest } from 'next/server';

/**
 * Create a log entry with timestamp for OAuth debugging
 */
export function createOAuthLog(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    if (data) {
        console.log(`[BetterAuth OAuth][${timestamp}] ${message}`, JSON.stringify(data, null, 2));
    } else {
        console.log(`[BetterAuth OAuth][${timestamp}] ${message}`);
    }
}

/**
 * Create a log entry for route handler debugging
 */
export function createRouteLog(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    if (data) {
        console.log(`[BetterAuth Route][${timestamp}] ${message}`, JSON.stringify(data, null, 2));
    } else {
        console.log(`[BetterAuth Route][${timestamp}] ${message}`);
    }
}

/**
 * Log important request headers for OAuth debugging
 */
export function logRequestHeaders(request: NextRequest) {
    const headers = {
        'X-Forwarded-Host': request.headers.get('x-forwarded-host') || '(not set)',
        'X-Forwarded-Proto': request.headers.get('x-forwarded-proto') || '(not set)',
        'X-Forwarded-Port': request.headers.get('x-forwarded-port') || '(not set)',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') || '(not set)',
        'Origin': request.headers.get('origin') || '(not set)',
        'Referer': request.headers.get('referer') || '(not set)',
        'Host': request.headers.get('host') || '(not set)',
        'User-Agent': request.headers.get('user-agent') || '(not set)',
    };

    createRouteLog('Request headers:', headers);

    // Detect the origin from headers
    const forwardedHost = request.headers.get('x-forwarded-host');
    const forwardedProto = request.headers.get('x-forwarded-proto');
    const detectedOrigin = forwardedHost && forwardedProto
        ? `${forwardedProto}://${forwardedHost}`
        : request.headers.get('origin') || '(unknown)';

    createRouteLog('Detected origin:', {
        detectedOrigin,
        'From X-Forwarded headers': !!(forwardedHost && forwardedProto),
    });

    return { headers, detectedOrigin };
}

/**
 * Log OAuth-specific parameters
 */
export function logOAuthParams(params: {
    provider?: string;
    callbackURL?: string;
    redirectURI?: string;
    state?: string;
    scope?: string;
    codeChallenge?: string;
}) {
    createOAuthLog('OAuth parameters:', {
        provider: params.provider,
        callbackURL: params.callbackURL,
        redirectURI: params.redirectURI,
        hasState: !!params.state,
        statePreview: params.state ? `${params.state.substring(0, 10)}...` : '(none)',
        scope: params.scope,
        hasCodeChallenge: !!params.codeChallenge,
    });
}

/**
 * Log OAuth URL before redirect
 */
export function logOAuthRedirect(url: string) {
    createOAuthLog('OAuth redirect URL:', {
        url,
        'URL length': url.length,
        'Contains redirect_uri': url.includes('redirect_uri'),
        'Extracted redirect_uri': extractRedirectURI(url),
    });
}

/**
 * Extract redirect_uri from OAuth URL
 */
function extractRedirectURI(url: string): string {
    try {
        const urlObj = new URL(url);
        const redirectURI = urlObj.searchParams.get('redirect_uri');
        return redirectURI || '(not found)';
    } catch {
        return '(invalid URL)';
    }
}

/**
 * Log OAuth callback handling
 */
export function logOAuthCallback(provider: string, request: NextRequest) {
    createOAuthLog(`OAuth callback received for ${provider}`);
    const { headers, detectedOrigin } = logRequestHeaders(request);

    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    createOAuthLog('OAuth callback query parameters:', {
        hasCode: 'code' in searchParams,
        hasState: 'state' in searchParams,
        hasError: 'error' in searchParams,
        error: searchParams.error || '(none)',
        params: Object.keys(searchParams),
    });

    return { headers, detectedOrigin, searchParams };
}

/**
 * Log initialization configuration
 */
export function logAuthInit(config: {
    proxyHeadersEnabled: boolean;
    baseURL?: string;
    trustedOrigins: string[];
    googleClientId?: string;
    hasGoogleClientSecret: boolean;
    basePath: string;
}) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth Init][${timestamp}] Configuration:`, JSON.stringify({
        proxyHeadersEnabled: config.proxyHeadersEnabled,
        baseURL: config.baseURL || '(auto-detect from headers)',
        baseURLSource: config.baseURL ? 'BETTER_AUTH_URL env var' : 'X-Forwarded headers',
        trustedOrigins: config.trustedOrigins,
        googleProvider: {
            clientId: config.googleClientId || '(not set)',
            clientSecret: config.hasGoogleClientSecret ? '(set)' : '(not set)',
        },
        basePath: config.basePath,
    }, null, 2));
}
