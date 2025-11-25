// app/credentials-plugin/index.ts
import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";

/**
 * Minimal mock credentials plugin aligned with official documentation.
 * - Exposes endpoints for sign-in and sign-out.
 * - Logs "hello world" on invocation.
 * - Returns { result: "helloworld" } without real authentication.
 */
export const credentialsPlugin2 = {
    id: "credentials", // Required unique identifier

    // Optional schema (omitted here for minimalism; add if needed for type extensions)
    // schema: { user: { fields: { ... } } },

    // Endpoints: Define custom routes using createAuthEndpoint
    endpoints: {
        // Sign-in endpoint: POST /api/auth/signincred
        signInCredentials: createAuthEndpoint(
            "/signincred",
            { method: "POST" },
            async (ctx) => {
                // Parse body (minimal; no validation)
                const body = await ctx.request?.json();
                const { username, password } = body || {};

                console.log("hello world (signIn)");
                console.log("→ username:", username);
                console.log("→ password:", password ?? "(none)");

                // Return mock response
                return ctx.json(
                    { result: "helloworld" },
                    { status: 200 }
                );
            }
        ),

        // Sign-out endpoint: POST /api/auth/sign-out/credentials (namespaced to avoid conflicts)
        signOutCredentials: createAuthEndpoint(
            "/sign-out/credentials",
            { method: "POST" },
            async (ctx) => {
                console.log("hello world (signOut)");

                // Return mock response
                return ctx.json(
                    { result: "helloworld" },
                    { status: 200 }
                );
            }
        ),
    },

    // Optional hooks (omitted here for minimalism; add for pre/post logic if needed)
    // hooks: { before: [...], after: [...] },

    // Optional error codes (omitted; use if custom errors are required)
} satisfies BetterAuthPlugin;