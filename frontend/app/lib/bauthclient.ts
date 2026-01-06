// app/lib/bauthclient.ts
import { User } from 'better-auth';
import { credentialsClient } from 'better-auth-credentials-plugin';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { username } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { auth, myCustomSchema } from "./auth";
interface MyUser extends User {
    token?: string;
    extUser: unknown;
    tokenMaxAge: number;

}
export const bauthClient = createAuthClient({
    basePath: "/absproxy/3000/api/bauth",
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
