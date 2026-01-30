/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/lib/auth.ts
import { config } from '@tcon360/config';
import { betterAuth } from 'better-auth';
import { credentials } from 'better-auth-credentials-plugin';
import { customSession, username } from 'better-auth/plugins';
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
const logAuth = (description: string, details: object = {}) => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`\n[BetterAuth][${timestamp}] ${description}`, JSON.stringify(details, null, 2));
};

const tokenExpiration = Number(process.env.TOKEN_MAX_AGE) || 30 * 24 * 60 * 60; // 30 days in seconds
const computedBasePath = '/api/bauth';

logAuth('🚀 BetterAuth is initializing...', {
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || '(not set)',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || '(not set)',
    NEXTAUTH_SECRET_set: !!process.env.NEXTAUTH_SECRET,
    JWT_SECRET_set: !!process.env.JWT_SECRET,
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    tokenExpirationInSeconds: tokenExpiration,
    computedBasePath,
    tcon360Config: {
        basepath: config.basepath,
        prefix: config.prefix,
        ...config
    },
    googleProvider: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    }
});

// ──────────────────────────────────────────────────────────────
// BetterAuth configuration (headless JWT mode)
// ──────────────────────────────────────────────────────────────
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || 'https://code2.raygor.cc/absproxy/3000',
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
        expiresIn: tokenExpiration,
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
                    logAuth("[Credentials Callback] Missing identifier or password", { parsed });
                    return null;
                }

                logAuth("[Credentials Callback] Starting authentication", {
                    identifier,
                    hasPassword: !!password, // Don't log the password itself
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
                        logAuth("[Credentials Callback] JWT decode failed", { error: e.message });
                        return null;
                    }
                };

                try {
                    // Inside your credentials plugin callback
                    const backendLoginUrl = `http://localhost:${config.backendport}/api/user/login`;

                    logAuth("[Credentials Callback] Sending request to Nest.js", {
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

                    logAuth("[Credentials Callback] Nest.js response status", { status: nestResponse.status });

                    if (!nestResponse.ok) {
                        const errorData = await nestResponse.json().catch(() => ({}));
                        logAuth("[Credentials Callback] Nest.js authentication failed", {
                            status: nestResponse.status,
                            errorData,
                        });
                        return null;
                    }

                    const nestData = await nestResponse.json();
                    logAuth("[Credentials Callback] Full Nest.js response", {
                        rawResponse: JSON.stringify(nestData, null, 2),
                    });

                    const nestJwt = nestData.accessToken;
                    if (!nestJwt) {
                        logAuth("[Credentials Callback] No accessToken in Nest.js response");
                        return null;
                    }

                    logAuth("[Credentials Callback] Nest.js JWT received", { token: nestJwt.substring(0, 50) + "..." });

                    const userFromNest = nestData.user || decodeJwt(nestJwt) || {};
                    const tokenMaxAge = nestData.tokenMaxAge;

                    logAuth("[Credentials Callback] Extracted user data from Nest.js", {
                        source: nestData.user ? 'user object' : 'jwt',
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

                    logAuth("[Credentials Callback] Returning user to Better Auth", betterAuthUser);
                    return betterAuthUser;

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    logAuth("[Credentials Callback] Unexpected error during authentication", {
                        error: errorMessage,
                        stack: error instanceof Error ? error.stack : undefined,
                    });
                    return null;
                }
            },
        }),
        customSession(async (session) => {
            const now = new Date();
            const expiresAt = session.session?.expiresAt ? new Date(session.session.expiresAt) : null;

            logAuth('customSession callback', { session });
            return {
                ...session,
                user: {
                    ...session.user,

                },
            };
        }),
    ],
    basePath: '/api/bauth',
    debug: true,
    callbacks: {
        async signIn({ user, account, profile }) {
            // This callback handles ALL sign-in types: credentials, social, etc.
            // For social logins: account will contain provider info

            logAuth('signIn callback triggered', {
                hasUser: !!user,
                hasAccount: !!account,
                accountProvider: account?.provider,
                hasProfile: !!profile,
            });

            // Handle Google social login
            if (account?.provider === 'google' && profile) {
                logAuth('Google social login detected', {
                    profile: {
                        email: profile.email,
                        name: profile.name,
                        image: profile.image,
                    }
                });

                // Call backend with Google profile
                try {
                    const response = await fetch(`http://localhost:${config.backendport}/api/user/google-signup`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            googleId: profile.id || user.id,
                            email: profile.email || user.email,
                            name: profile.name || user.name,
                            picture: profile.image,
                        }),
                    });

                    if (!response.ok) {
                        logAuth('Google signup backend failed', { status: response.status });
                        return false;
                    }

                    const data = await response.json();
                    logAuth('Google signup backend success', { accessToken: !!data.accessToken });

                    // The backend will handle creating/updating the user
                    // Better-Auth will handle the session creation automatically
                    return true;
                } catch (error) {
                    logAuth('Error calling Google signup backend', { error: error.message });
                    return false;
                }
            }

            // For credentials login or other providers, allow the normal flow
            return true;
        },
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
    'signIn callback': 'Handles all sign-in types including Google OAuth',
    'socialHandlers': 'Removed problematic middleware, using signIn callback instead',
});

export type Auth = typeof auth;