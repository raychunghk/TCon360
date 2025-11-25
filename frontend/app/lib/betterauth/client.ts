// app/credentials-plugin/client.ts
import { BetterAuthClientPlugin, User } from "better-auth/client";
import type { credentialsPlugin } from "./index"; // Import the server plugin as a type for inference

// Infer the server plugin's type for client-side type safety and inference.
type CredentialsServerPlugin = ReturnType<typeof credentialsPlugin>;

export const credentialsClientPlugin = <U extends User = User, P extends string = "/signupcred">() => {
    return {
        id: "credentialsPlugin", // Must match the server plugin's ID
        // This property allows the client plugin to infer types defined by the server plugin.
        $InferServerPlugin: {} as CredentialsServerPlugin,

        // getActions: Exposes custom client-side actions that call server endpoints.
        // These provide type-safe methods to interact with the defined endpoints.
        // getActions: Defines type-safe client actions that map to server endpoints.
        // Each action is an async function taking the endpoint's input type as its sole parameter.
        getActions: ($fetch) => ({

            // Action for the signInCredentials endpoint (POST /auth/credentials-plugin/signincred)
            signInCredentials: async (input: { username: string; password: string }) => {
                console.log(`custm client getAction`);
                // Calls the server endpoint using $fetch (inferred method: POST, body: input)
                console.log(`getaction sigin`, input)
                const response = await $fetch("/signincred", {
                    method: "POST",
                    body: input,
                });
                // Returns the typed response (e.g., { success: true, message: "...", data: { username } })
                return response;
            },

            // Action for the getHelloWorld endpoint (GET /auth/credentials-plugin/my-plugin/hello-world)
            getHelloWorld: async () => {
                // Calls the server endpoint using $fetch (inferred method: GET, no body)
                const response = await $fetch("/auth/credentials-plugin/my-plugin/hello-world");
                // Returns the typed response (e.g., { message: "Hello World" })
                return response;
            },
        }),

        // getAtoms: Exposes reactive state atoms (using nanostores) for use in hooks or components.
        // This is boilerplate for session-like state tied to the plugin.


        // pathMethods: Overrides default HTTP method inference for specific paths.
        // By default, Better Auth infers GET for no-body paths and POST for body-sending ones.
        // This boilerplate overrides the getHelloWorld path to POST for demonstration.
        pathMethods: {
            "/credentials-plugin/my-plugin/hello-world": "POST", // Force POST method
        },
    } satisfies BetterAuthClientPlugin;
};