// app/api/auth/[...all]/route.ts
/*
import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
*/

import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

/**
 * Reconstruct request URL from X-Forwarded headers for social login routes.
 * This fixes redirect_uri_mismatch issues when behind a reverse proxy.
 * Only applies to social provider routes - credential routes are untouched.
 */
function reconstructUrlForSocial(request: NextRequest): NextRequest {
    const pathname = request.nextUrl.pathname;

    // Only reconstruct for social routes (OAuth callback and social sign-in initiation)
    // MUST NOT affect credential login at /api/bauth/sign-in/credentials
    if (!pathname.includes('callback') && !pathname.includes('sign-in/social')) {
        return request; // Return unchanged for credential routes
    }

    const proto = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost';
    const port = request.headers.get('x-forwarded-port');

    // Reconstruct the full URL with correct origin
    const url = new URL(request.url);
    url.protocol = proto + ':';
    url.hostname = host;
    url.port = port || '';

    // Create new request with reconstructed URL
    return new NextRequest(url, request);
}

// Single unified handler for all methods
//export const { GET, POST } = handler;

// Optional: If you want custom logging, wrap it properly without breaking types
const logRoute = (description: string, details: any = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth Route][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

export async function GET(request: NextRequest) {
    // Reconstruct URL for social routes to fix redirect_uri_mismatch behind reverse proxy
    const reconstructedRequest = reconstructUrlForSocial(request);

    logRoute('GET request received', {
        originalUrl: request.url,
        reconstructedUrl: reconstructedRequest.url,
        pathname: request.nextUrl.pathname
    });

    try {
        const response = await handler.GET(reconstructedRequest);
        logRoute('GET handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('GET error', { error: error.message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    // Reconstruct URL for social routes to fix redirect_uri_mismatch behind reverse proxy
    const reconstructedRequest = reconstructUrlForSocial(request);

    const cloned = reconstructedRequest.clone();
    let bodyPreview = "Not JSON or already consumed";
    try {
        const json = await cloned.json();
        bodyPreview = JSON.stringify(json).substring(0, 200) + "...";
    } catch { }

    logRoute('POST request received', {
        originalUrl: request.url,
        reconstructedUrl: reconstructedRequest.url,
        pathname: request.nextUrl.pathname,
        bodyPreview,
    });

    try {
        const response = await handler.POST(reconstructedRequest);
        
        // Intercept OAuth redirect response to fix redirect_uri
        if (request.nextUrl.pathname.includes('sign-in/social') && response.status === 200) {
            try {
                const body = await response.clone().json();
                
                // Check if this is a Google OAuth redirect
                if (body.url && body.url.includes('accounts.google.com')) {
                    // Reconstruct the correct proxy origin from X-Forwarded headers
                    const proto = request.headers.get('x-forwarded-proto') || 'https';
                    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost';
                    const port = request.headers.get('x-forwarded-port');
                    
                    // Only include port if it's not standard (80/443)
                    const portString = port && port !== '80' && port !== '443' ? `:${port}` : '';
                    const correctOrigin = `${proto}://${host}${portString}`;
                    
                    // Parse the OAuth URL and replace redirect_uri
                    const originalUrl = new URL(body.url);
                    const newRedirectUri = `${correctOrigin}/api/bauth/callback/google`;
                    originalUrl.searchParams.set('redirect_uri', newRedirectUri);
                    
                    logRoute('Rewriting Google OAuth redirect_uri', {
                        originalRedirectUri: body.url.match(/redirect_uri=([^&]+)/)?.[1],
                        newRedirectUri,
                        xForwardedHeaders: {
                            proto,
                            host,
                            port
                        }
                    });
                    
                    // Return modified response with corrected redirect_uri
                    return NextResponse.json({
                        ...body,
                        url: originalUrl.toString()
                    });
                }
            } catch (jsonError: any) {
                // Response wasn't JSON or couldn't be parsed, continue with original response
                logRoute('Could not parse response as JSON, returning original', { error: jsonError.message });
            }
        }
        
        logRoute('POST handled successfully', { status: response.status });
        return response;
    } catch (error: any) {
        logRoute('POST error', { error: error.message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}