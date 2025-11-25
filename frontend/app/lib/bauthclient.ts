// app/lib/bauthclient.ts
//import { credentialsClient } from "better-auth-credentials-plugin";
import { User } from "better-auth";
import { username } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { credentialsClientPlugin } from "./betterauth/client";


export const bauthClient = createAuthClient({
    basePath: "/absproxy/3000/api/buth",
    plugins: [
        username(),
        //credentialsLoggerPlugin(),
        // Client plugin (required for full type inference)
        credentialsClientPlugin<User, "/signincred">(),
        //    credentialsClient<User, "/sign-in/external", typeof myCustomSchema>(),
    ],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,

} = bauthClient;