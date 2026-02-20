// app/lib/bauthclient.ts
import { User } from 'better-auth';
import { credentialsClient } from 'better-auth-credentials-plugin';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { username } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { auth, myCustomSchema } from "./auth";
import { createOAuthLog } from "./auth-logger";

interface MyUser extends User {
    token?: string;
    extUser: unknown;
    tokenMaxAge: number;

}

// Determine the base URL for client-side requests
// Use BETTER_AUTH_URL if set, otherwise use current origin
const getClientBaseURL = (): string => {
    if (typeof window === 'undefined') {
        return '/api/bauth';
    }

    const envBaseURL = process.env.BETTER_AUTH_URL;
    if (envBaseURL) {
        return envBaseURL + '/api/bauth';
    }

    // Auto-detect from current origin (works with reverse proxy)
    const origin = window.location.origin;
    createOAuthLog('Client initialized', {
        origin,
        basePath: `${origin}/api/bauth`,
        'Using env var': !!envBaseURL,
    });

    return `${origin}/api/bauth`;
};

export const bauthClient = createAuthClient({
    baseURL: getClientBaseURL(),
    plugins: [

        username(),

        //credentialsLoggerPlugin(),
        // Client plugin (required for full type inference)
        credentialsClient<MyUser, "/sign-in/credentials", typeof myCustomSchema>(),
        //authClientPlugin(),
        inferAdditionalFields<typeof auth>(),
        //credentialsClient<User, "/sign-in/external", typeof myCustomSchema>(),
    ],
});

export const {
    signIn,
    signUp,
    signOut,
} = bauthClient;
/*
function email() {
    throw new Error("Function not implemented.");
}
*/
