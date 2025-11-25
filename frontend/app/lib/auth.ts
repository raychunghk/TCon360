/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/lib/auth.ts
import { config } from '@tcon360/config';
import { betterAuth } from 'better-auth';
//import { credentials } from "better-auth-credentials-plugin";
import { customSession, username } from 'better-auth/plugins';
import { credentialsPlugin } from './betterauth';
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
const computedBasePath = '/absproxy/3000/api/buth'
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

    // This is the ONLY place you set the JWT secret
    secret: process.env.JWT_SECRET!,

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
        //credentialsPlugin2(),
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
        credentialsPlugin()
    ],

    // Explicitly set basePath here. This is crucial for the client-side library
    // to correctly build URLs, especially in proxied environments.
    basePath: computedBasePath,

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