// app/lib/bauthclient.ts
//import { credentialsClient } from "better-auth-credentials-plugin";
import { User } from "better-auth";
import { credentialsClient } from "better-auth-credentials-plugin";
import { username } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { myCustomSchema } from "./auth";


export const bauthClient = createAuthClient({
    basePath: "/absproxy/3000/api/bauth",
    plugins: [

        username(),

        //credentialsLoggerPlugin(),
        // Client plugin (required for full type inference)
        credentialsClient<User, "/sign-in/credentials", typeof myCustomSchema>(),
        //    credentialsClient<User, "/sign-in/external", typeof myCustomSchema>(),
    ],
});

export const {
    signIn,
    signUp,


} = bauthClient;
/*
function email() {
    throw new Error("Function not implemented.");
}
*/
