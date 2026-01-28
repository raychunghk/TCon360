/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/lib/auth.ts
import { config } from '@tcon360/config';
import { betterAuth } from 'better-auth';
import { credentials } from 'better-auth-credentials-plugin';
import { createAuthMiddleware, customSession, username } from 'better-auth/plugins';
import z from 'zod/v3';
import { customSignInResponsePlugin } from './plugin/customSignInResponsePlugin';

export const myCustomSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    email: z.string().min(1),
});

// ──────────────────────────────────────────────────────────────
// Comprehensive logging – will show you everything at startup
// ──────────────────────────────────────────────────────────────
const logAuth = (description: string, details: any = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};
const _tokenExpiration = Number(process.env.TOKEN_MAX_AGE) || 30 * 24 * 60 * 60
const google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    autoSignUp: false, // Disable automatic user creation for Google
}
logAuth('🚀 BetterAuth is initializing...', {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || '(not set)',
    NEXTAUTH_SECRET_set: !!process.env.NEXTAUTH_SECRET,
    JWT_SECRET_set: !!process.env.JWT_SECRET,
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    _tokenExpiration: _tokenExpiration,
    config_snapshot: {
        basepath: config.basepath,
        prefix: config.prefix,
        frontendport: config.frontendport,
        backendport: config.backendport,
        feprefix: config.feprefix,
        useReverseProxy: config.useReverseProxy,
    },
    google
});

const computedBasePath = '/api/bauth';
logAuth('🎯 FINAL basePath that BetterAuth will register', {
    raw_basepath: config.basepath || '(empty → root)',
    computedBasePath,
    example_session_url: `https://your-domain.raygor.cc${computedBasePath}/session`,
    example_signin_url: `https://your-domain.raygor.cc${computedBasePath}/signin`,
});

// ──────────────────────────────────────────────────────────────
// BetterAuth configuration (headless JWT mode)
// ──────────────────────────────────────────────────────────────
export const auth = betterAuth({
    advanced: {
        disableCSRFCheck: true,
    },
    trustedOrigins: [
        "*.raygor.cc",
        "localhost",
        "https://*.example.com",
        "http://*.dev.example.com",
    ],
    secret: process.env.JWT_SECRET!,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            autoSignUp: false, // Disable automatic user creation for Google
        }
    },
    user: {
        additionalFields: {
            role: { type: "string" },
            staff: { type: "json" },
            tkn: { type: "string" },
            nestJwt: { type: "string" },
            username: { type: "string" },
            tokenMaxAge: { type: "number" },
        },
    },
    emailAndPassword: {
        enabled: false,
    },
    session: {
        strategy: 'jwt',
        expiresIn: _tokenExpiration,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 // Cache duration in seconds (5 minutes)
        }
    },
    cookies: {
        sessionToken: {
            name: 'session_token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    plugins: [
        username({ minUsernameLength: 5 }),
        customSignInResponsePlugin(), // Imported from separate file
        credentials({
            autoSignUp: true,
            path: "/sign-in/credentials",
            inputSchema: myCustomSchema,
            async callback(ctx, parsed) {
                const { email, username, password } = parsed;
                const identifier = email || username;

                if (!identifier || !password) {
                    console.error("[Credentials Callback] Missing identifier or password", { parsed });
                    return null;
                }

                console.log("[Credentials Callback] Starting authentication", {
                    identifier,
                    hasPassword: !!password,
                    timestamp: new Date().toISOString(),
                });

                const decodeJwt = (token: string) => {
                    try {
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(
                            atob(base64)
                                .split('')
                                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                                .join('')
                        );
                        return JSON.parse(jsonPayload);
                    } catch (e) {
                        console.error("[Credentials Callback] JWT decode failed:", e);
                        return null;
                    }
                };

                try {
                    // Inside your credentials plugin callback
                    const backendLoginUrl = `http://localhost:${config.backendport}/api/user/login`;

                    console.log("[Credentials Callback] Sending request to Nest.js", {
                        url: backendLoginUrl,
                        body: {
                            identifier,
                            password: "****",
                            excludeViewStaff: true   // ← NEW: tell NestJS to slim the JWT
                        },
                    });

                    const nestResponse = await fetch(backendLoginUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            identifier,
                            password,
                            excludeViewStaff: true   // ← send the flag
                        }),
                    });

                    console.log("[Credentials Callback] Nest.js response status:", nestResponse.status);

                    if (!nestResponse.ok) {
                        const errorData = await nestResponse.json().catch(() => ({}));
                        console.error("[Credentials Callback] Nest.js authentication failed", {
                            status: nestResponse.status,
                            errorData,
                        });
                        return null;
                    }

                    const nestData = await nestResponse.json();
                    console.log("[Credentials Callback] Full Nest.js response:", {
                        rawResponse: JSON.stringify(nestData, null, 2),
                    });

                    const nestJwt = nestData.accessToken;
                    if (!nestJwt) {
                        console.error("[Credentials Callback] No accessToken in Nest.js response");
                        return null;
                    }

                    console.log("[Credentials Callback] Nest.js JWT received:", nestJwt.substring(0, 50) + "...");

                    const userFromNest = nestData.user || decodeJwt(nestJwt) || {};
                    const tokenMaxAge = nestData.tokenMaxAge;

                    console.log("[Credentials Callback] Extracted user data from Nest.js:", {
                        fromUserField: !!nestData.user,
                        fromJwt: !!userFromNest.sub || !!userFromNest.id,
                        userData: userFromNest,
                        tokenMaxAge,
                    });

                    const betterAuthUser = {
                        id: userFromNest.id,
                        email: userFromNest.email,
                        name: userFromNest.name,
                        image: userFromNest.image || null,
                        staff: userFromNest.staff || [],
                        tokenMaxAge,
                        nestJwt,
                    };

                    console.log("[Credentials Callback] Returning user to Better Auth:", betterAuthUser);
                    return betterAuthUser;

                } catch (error) {
                    if (error instanceof Error) {
                        console.error("[Credentials Callback] Unexpected error during authentication:", {
                            message: error.message,
                            stack: error.stack,
                        });
                    } else {
                        console.error("[Credentials Callback] Unexpected and unknown error during authentication:", error);
                    }
                    return null;
                }
            },
        }),
        customSession(async (session) => {
            const now = new Date();
            const expiresAt = session.session?.expiresAt ? new Date(session.session.expiresAt) : null;
            logAuth('customSession callback', { session });
            //const nestJwt = session.user?.nestJwt;
            return {
                ...session,
                user: {
                    ...session.user,

                },
                //  nestJwt,
            };
        }),
        {
            id: 'custom-social-handler',
            hooks: {
                after: [
                    {
                        matcher: (ctx) => ctx.path === '/sign-in/social',
                        handler: createAuthMiddleware(async (ctx) => {
                            const { provider, profile } = ctx.context.socialAuth;

                            if (provider === 'google' && profile) {
                                logAuth('Intercepting Google social login', { profile });

                                const backendGoogleUrl = `http://localhost:${config.backendport}/api/auth/google-signup`;

                                try {
                                    const nestResponse = await fetch(backendGoogleUrl, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            googleId: profile.id,
                                            email: profile.email,
                                            name: profile.name,
                                            picture: profile.picture,
                                        }),
                                    });

                                    if (!nestResponse.ok) {
                                        const errorData = await nestResponse.json().catch(() => ({}));
                                        console.error('[Google Social Callback] Nest.js authentication failed', {
                                            status: nestResponse.status,
                                            errorData,
                                        });
                                        return null;
                                    }

                                    const nestData = await nestResponse.json();
                                    console.log('[Google Social Callback] Full Nest.js response:', {
                                        rawResponse: JSON.stringify(nestData, null, 2),
                                    });

                                    const nestJwt = nestData.accessToken;
                                    if (!nestJwt) {
                                        console.error('[Google Social Callback] No accessToken in Nest.js response');
                                        return null;
                                    }

                                    const userFromNest = nestData.user;
                                    const tokenMaxAge = nestData.tokenMaxAge;

                                    const betterAuthUser = {
                                        id: userFromNest.id,
                                        email: userFromNest.email,
                                        name: userFromNest.name,
                                        image: userFromNest.image || null,
                                        staff: userFromNest.staff || [],
                                        tokenMaxAge,
                                        nestJwt,
                                    };

                                    if (ctx.context.newSession) {
                                        (ctx.context.newSession as any).user = betterAuthUser;
                                    }

                                    return ctx.context.returned;

                                } catch (error) {
                                    console.error('[Google Social Callback] Unexpected error during authentication:', {
                                        message: error instanceof Error ? error.message : String(error),
                                    });
                                    return null;
                                }
                            }

                            // Fallback: return the original response if conditions are not met
                            return ctx.context.returned;
                        }),
                    },
                ],
            },
        },
    ],
    basePath: '/api/bauth',
    debug: true,
    callbacks: {
        async session({ session }) {
            const now = new Date();
            const expiresAt = session.session?.expiresAt ? new Date(session.session.expiresAt) : null;

            logAuth('Session callback triggered (server-side)', {
                userId: session.user?.id,
                expiresAt: session.session?.expiresAt,
                expiresAtTimestamp: expiresAt?.toISOString(),
                timeUntilExpiryMs: expiresAt ? expiresAt.getTime() - now.getTime() : null,
                isExpired: expiresAt ? expiresAt < now : true,
                sessionHasUser: !!session.user,
                fullSessionKeys: Object.keys(session),
            });

            return session;
        },
    },
});

// ──────────────────────────────────────────────────────────────
// FINAL CONFIRMATION LOG
// ──────────────────────────────────────────────────────────────
logAuth('✅ BetterAuth configuration completed and ready', {
    computedBasePath,
    session_strategy: 'jwt',
    cookie_name: 'session_token',
    plugins: ['username', 'customSignInResponsePlugin', 'customSession'],
    'BetterAuth API routes will be available at': computedBasePath + '/*',
});

export type Auth = typeof auth;