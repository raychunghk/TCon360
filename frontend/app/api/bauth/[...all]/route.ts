// app/api/bauth/[...all]/route.ts
import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
import { logRequestHeaders, createRouteLog, logOAuthParams, logOAuthRedirect, logOAuthCallback } from "@/app/lib/auth-logger";

const handler = toNextJsHandler(auth);

// Single unified handler for all methods
//export const { GET, POST } = handler;

// Optional: If you want custom logging, wrap it properly without breaking types
const logRoute = (description: string, details: any = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth Route][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

/**
 * Extract OAuth-related information from request
 */
function extractOAuthInfo(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isOAuthRoute = pathname.includes('/sign-in/social') || pathname.includes('/callback/');

    if (!isOAuthRoute) {
        return null;
    }

    // Extract provider from path
    const providerMatch = pathname.match(/\/(?:sign-in|callback)\/(\w+)/);
    const provider = providerMatch ? providerMatch[1] : 'unknown';

    return {
        isOAuthRoute,
        provider,
        pathname,
    };
}

/**
 * Log OAuth-specific information
 */
function logOAuthRequest(request: NextRequest) {
    const oauthInfo = extractOAuthInfo(request);
    if (!oauthInfo) {
        return;
    }

    createRouteLog('OAuth route detected', {
        provider: oauthInfo.provider,
        pathname: oauthInfo.pathname,
        method: request.method,
    });

    // Log headers for debugging
    const { headers, detectedOrigin } = logRequestHeaders(request);

    // If it's a sign-in request, log what will be sent to OAuth provider
    if (oauthInfo.pathname.includes('/sign-in/social')) {
        createRouteLog('OAuth sign-in request', {
            provider: oauthInfo.provider,
            detectedOrigin,
            'Expected callback URL': `${detectedOrigin}${request.nextUrl.pathname.replace('/sign-in', '/callback')}`,
        });
    }

    // If it's a callback request, log callback details
    if (oauthInfo.pathname.includes('/callback')) {
        const { searchParams } = logOAuthCallback(oauthInfo.provider, request);
        createRouteLog('OAuth callback details', {
            provider: oauthInfo.provider,
            hasCode: 'code' in searchParams,
            hasState: 'state' in searchParams,
            hasError: 'error' in searchParams,
            error: searchParams.error || '(none)',
        });
    }
}

export async function GET(request: NextRequest) {
    logRoute('GET request received', {
        url: request.url,
        pathname: request.nextUrl.pathname,
    });

    // Log OAuth-specific information
    logOAuthRequest(request);

    try {
        const response = await handler.GET(request);

        // Log if this is a redirect (likely OAuth)
        if (response.status === 302 || response.status === 301) {
            const location = response.headers.get('location');
            if (location) {
                logRoute('Redirect response', {
                    status: response.status,
                    location,
                    isOAuthRedirect: location.includes('accounts.google.com') || location.includes('oauth'),
                });
            }
        }

        logRoute('GET handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('GET error', {
            error: error.message,
            stack: error.stack,
            pathname: request.nextUrl.pathname,
        });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const cloned = request.clone();
    let bodyPreview = "Not JSON or already consumed";
    let bodyData: any = null;

    try {
        bodyData = await cloned.json();
        bodyPreview = JSON.stringify(bodyData).substring(0, 200) + "...";
    } catch { }

    logRoute('POST request received', {
        url: request.url,
        pathname: request.nextUrl.pathname,
        bodyPreview,
    });

    // Log OAuth-specific information
    logOAuthRequest(request);

    // If this is a social sign-in POST request, log parameters
    const oauthInfo = extractOAuthInfo(request);
    if (oauthInfo && oauthInfo.pathname.includes('/sign-in/social')) {
        logOAuthParams({
            provider: oauthInfo.provider,
            callbackURL: bodyData?.callbackURL,
            redirectURI: bodyData?.redirectURI,
            state: bodyData?.state,
            scope: bodyData?.scope,
            codeChallenge: bodyData?.codeChallenge,
        });
    }

    try {
        const response = await handler.POST(request);
        logRoute('POST handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('POST error', {
            error: error.message,
            stack: error.stack,
            pathname: request.nextUrl.pathname,
        });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}