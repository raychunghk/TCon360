/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/lib/auth.ts
import { config } from '@tcon360/config';
import { betterAuth } from 'better-auth';
import { credentials } from 'better-auth-credentials-plugin';
//import { credentials } from "better-auth-credentials-plugin";
import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware, customSession, username } from 'better-auth/plugins';
import z from 'zod/v3';

const customSignInResponsePlugin = (): BetterAuthPlugin => ({
    id: "custom-signin-response",
    hooks: {
        after: [
            {
                matcher: (ctx) => ctx.path === "/sign-in/credentials",
                handler: createAuthMiddleware(async (ctx) => {
                    // ctx.context.returned contains the session token and the user object
                    if (ctx.context.returned && !ctx.context.error) {
                        const original = ctx.context.returned;

                        console.log('[Plugin] ctx.context new session:', JSON.stringify(ctx.context.newSession, null, 2));
                        const extUser = ctx.context.newSession?.user
                        console.log('[Plugin] Intercepted Response User:', JSON.stringify(original.user, null, 2));
                        console.log('[Plugin] Intercepted Response :', JSON.stringify(original, null, 2));
                        // We return a custom JSON structure to the client
                        return ctx.json({
                            // original.user.nestJwt is available because it's in additionalFields
                            token: original.token,
                            user: original.user,
                            extUser
                        });
                    }
                    return ctx.next();
                }),
            },
        ],
    },
});
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

logAuth('🚀 BetterAuth is initializing...', {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || '(not set)',
    NEXTAUTH_SECRET_set: !!process.env.NEXTAUTH_SECRET,
    JWT_SECRET_set: !!process.env.JWT_SECRET,
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    config_snapshot: {
        basepath: config.basepath, // This is your proxy prefix, e.g., "/absproxy/3000"
        prefix: config.prefix,
        frontendport: config.frontendport,
        backendport: config.backendport,
        feprefix: config.feprefix,
        useReverseProxy: config.useReverseProxy,
    },
});

// Compute the final basePath that BetterAuth will use
// If config.basepath is "/absproxy/3000", then computedBasePath will be "/absproxy/3000/api/auth"
/*
const computedBasePath = config.basepath
    ? `${config.basepath}/api/buth`
    : '/api/buth';
*/
const computedBasePath = '/api/bauth'
logAuth('🎯 FINAL basePath that BetterAuth will register', {
    raw_basepath: config.basepath || '(empty → root)',
    computedBasePath,
    example_session_url:
        config.basepath
            ? `https://your-domain.raygor.cc${computedBasePath}/session`
            : `https://your-domain.raygor.cc${computedBasePath}/session`,
    example_signin_url:
        config.basepath
            ? `https://your-domain.raygor.cc${computedBasePath}/signin`
            : `https://your-domain.raygor.cc${computedBasePath}/signin`,
});

// ──────────────────────────────────────────────────────────────
// BetterAuth configuration (headless JWT mode)
// ──────────────────────────────────────────────────────────────
export const auth = betterAuth({
    // No database – pure JWT mode
    database: null,
    advanced: {
        disableCSRFCheck: true
    },
    trustedOrigins: [
        "*.raygor.cc",             // Trust all subdomains of example.com (any protocol)
        "localhost",             // Trust all subdomains of example.com (any protocol)
        "https://*.example.com",     // Trust only HTTPS subdomains of example.com
        "http://*.dev.example.com"   // Trust all HTTP subdomains of dev.example.com
    ],
    // This is the ONLY place you set the JWT secret
    secret: process.env.JWT_SECRET!,
    user: {
        additionalFields: {
            role: { type: "string" },
            staff: { type: "any" }, // Using any for arrays/objects
            tkn: { type: "any" },
            nestJwt: { type: "any" },
            username: { type: "string" }
        }
    },
    // Your NestJS login endpoint
    emailAndPassword: {
        // Disable email and password authentication
        // Users will both sign-in and sign-up via Credentials plugin
        enabled: false,
    },

    // Use JWT strategy (built-in)
    session: {
        strategy: 'jwt',
        expiresIn: Number(process.env.TOKEN_MAX_AGE) || 30 * 24 * 60 * 60, // seconds
    },

    // Neutral cookie name to avoid government firewall blocks
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

    // Optional plugins
    plugins: [
        username({ minUsernameLength: 5 }),
        customSignInResponsePlugin(),
        credentials({
            autoSignUp: true, // Changed to true for flexibility – Better Auth will create session even for new users
            path: "/sign-in/credentials",
            inputSchema: myCustomSchema,

            async callback(ctx, parsed) {
                const { email, username, password } = parsed;
                const identifier = email || username;

                // Early validation
                if (!identifier || !password) {
                    console.error("[Credentials Callback] Missing identifier or password", { parsed });
                    return null;
                }

                console.log("[Credentials Callback] Starting authentication", {
                    identifier,
                    hasPassword: !!password,
                    timestamp: new Date().toISOString(),
                });

                // Decode JWT helper (moved outside for reusability)
                const decodeJwt = (token: string) => {
                    try {
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(
                            atob(base64)
                                .split('')
                                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                                .join('')
                        );
                        return JSON.parse(jsonPayload);
                    } catch (e) {
                        console.error("[Credentials Callback] JWT decode failed:", e);
                        return null;
                    }
                };

                try {
                    const backendLoginUrl = `http://localhost:${config.backendport}/api/user/login`;
                    console.log("[Credentials Callback] Sending request to Nest.js", {
                        url: backendLoginUrl,
                        body: { identifier, password: "****" }, // Mask password in logs
                    });

                    const nestResponse = await fetch(backendLoginUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ identifier, password }),
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
                        rawResponse: JSON.stringify(nestData, null, 2), // Pretty-printed full JSON
                    });

                    const nestJwt = nestData.accessToken;
                    if (!nestJwt) {
                        console.error("[Credentials Callback] No accessToken in Nest.js response");
                        return null;
                    }

                    console.log("[Credentials Callback] Nest.js JWT received:", nestJwt.substring(0, 50) + "...");

                    // Try to extract user data – prefer nestData.user if present
                    const userFromNest = nestData.user || decodeJwt(nestJwt) || {};

                    console.log("[Credentials Callback] Extracted user data from Nest.js:", {
                        fromUserField: !!nestData.user,
                        fromJwt: !!userFromNest.sub || !!userFromNest.id,
                        userData: userFromNest,
                    });

                    // Build Better Auth user object (required fields + custom)
                    // This is where you shape the data that gets stored in the session JWT.
                    /*return {
                        id: userFromNest.id || userFromNest.sub || identifier,
                        email: userFromNest.email || identifier,
                        name: userFromNest.name || identifier,
                        // Custom fields defined in user.additionalFields
                        role: userFromNest.role || "user",
                        staff: userFromNest.staff || [],
                        tkn: nestJwt,
                        username: identifier,
                    };*/
                    const betterAuthUser = {
                        // --- Standard fields ---
                        id: userFromNest.id,
                        email: userFromNest.email,
                        name: userFromNest.name,
                        image: userFromNest.image || null, // Ensure image is present or null
                        staff: userFromNest.staff || [],
                        // --- Custom fields for your session ---
                        // Here we embed the entire user object from your NestJS backend,
                        // which includes the nested staff and contract data.

                        // nestJwt: nestJwt, // Include the original token from the backend
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
        // credentials({
        //     autoSignUp: true,
        //     path: "/sign-in/credentials",
        //     inputSchema: myCustomSchema,
        //     async callback(ctx, parsed) {
        //         // Just for demonstration purposes, half of the time we will fail the authentication
        //         console.log(`PARSED:?`, parsed);

        //         return {
        //             // Called if this is a existing user sign-in
        //             onSignIn(userData, user, account) {
        //                 console.log("Existing User signed in:", user);

        //                 return userData;
        //             },

        //             // Called if this is a new user sign-up (only used if autoSignUp is true)
        //             onSignUp(userData) {
        //                 console.log("New User signed up:", userData.email);

        //                 return {
        //                     ...userData,
        //                     name: parsed.email.split("@")[0]
        //                 };
        //             }
        //         };
        //     },
        // }),
        customSession(async (session) => {
            logAuth('customSession callback', { session });
            return {
                ...session,
                user: {
                    ...session.user,
                    dd: 'test',
                },
            };
        }),

    ],

    // Explicitly set basePath here. This is crucial for the client-side library
    // to correctly build URLs, especially in proxied environments.
    basePath: '/api/bauth',

    debug: true,
    callbacks: {
        /**
         * The `session` callback is called whenever a session is checked.
         * This is the perfect place to inspect and log session data.
         * It runs when a user logs in, when a session is updated,
         * and crucially, when the `/api/buth/session` endpoint is hit.
         *
         * @param {object} params - Object containing session, token, and user.
         * @param {object} params.session - The session object.
         * @param {object} params.token - The JWT token.
         * @param {object} params.user - The user object.
         * @returns {Promise<object>} The modified session object.
         */
        async session({ session, token, user }) {
            console.log('\n--- BetterAuth Session Callback Triggered ---');

            if (session && Object.keys(session).length > 0) {
                console.log('Valid session found:');
                // Log the entire session content, formatted for readability
                console.log(JSON.stringify(session, null, 2));
            } else {
                console.log('No session data available in callback.');
            }
            console.log('--- End BetterAuth Session Callback ---\n');

            // It's crucial to return the session object, possibly modified.
            // For this example, we just return the original session.
            return session;
        },

        /**
         * The `jwt` callback is called whenever a JWT is created or updated.
         * You can also add logging here if you want to see the JWT content.
         * @param {object} params - Object containing token, user, account, profile, isNewUser.
         * @returns {Promise<object>} The modified token object.
         */
        // async jwt({ token, user, account, profile }) {
        //   console.log('JWT callback triggered:', JSON.stringify(token, null, 2));
        //   if (user) {
        //     token.id = user.id;
        //   }
        //   return token;
        // },

        // You might have other callbacks like signIn, redirect, etc.
    },
});

// ──────────────────────────────────────────────────────────────
// FINAL CONFIRMATION LOG – appears right before export
// ──────────────────────────────────────────────────────────────
logAuth('✅ BetterAuth configuration completed and ready', {
    computedBasePath,
    session_strategy: 'jwt',
    cookie_name: 'session_token',
    plugins: ['username', 'customSession'], // 'nextCookies' is an internal mechanism, not a user-defined plugin
    'BetterAuth API routes will be available at': computedBasePath + '/*',
});

export type Auth = typeof auth;