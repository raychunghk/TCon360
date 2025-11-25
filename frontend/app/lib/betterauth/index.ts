/* eslint-disable @typescript-eslint/no-unused-vars */
// app/credentials-plugin/index.ts
import { BetterAuthPlugin, User } from "better-auth";
import { createAuthEndpoint, createAuthMiddleware, sessionMiddleware } from "better-auth/api";

export const credentialsPlugin = <U extends User = User, P extends string = "/signincred">() => ({
    id: "credentialsPlugin",
    onRequest: async (request, context) => {
        //do something
        console.log(request);
        console.log(context);
    },
    // Minimal schema – required by Better Auth even if you don’t use the fields yet
    schema: {
        user: {
            fields: {
                // These fields will be added to types but are not used in this mock
                username: { type: "string", required: false },
                password: { type: "string", required: false },
            },
        },
    },

    // Custom endpoint (no database, pure mock)
    endpoints: {
        getHelloWorld: createAuthEndpoint("/my-plugin/hello-world", {
            method: "GET",
            use: [sessionMiddleware],
        }, async (ctx) => {
            const session = ctx.context.session;
            return ctx.json({
                message: "Hello World"
            })
        }),
        signInCredentials: createAuthEndpoint(
            "/signincred",
            { method: "POST" },
            async (ctx) => {
                const body = await ctx.request?.json();
                const { username, password } = body;

                console.log("\n=== CREDENTIALS ENDPOINT RECEIVED ===");
                console.log("Username:", username);
                console.log("Password:", password ?? "(empty)");
                console.log("======================================\n");

                // Mock successful sign-in
                return ctx.json(
                    {
                        success: true,
                        message: "Mock credentials sign-in successful",
                        data: { username },
                    },
                    { status: 200 }
                );
            }
        ),
    },

    hooks: {
        before: [
            {
                matcher: (ctx) => ctx.path.startsWith("/absproxy/3000/signincred"),
                handler: createAuthMiddleware(async (ctx) => {
                    const body = await ctx.request?.json();

                    console.log("\n--- Credentials Plugin BEFORE Hook ---");
                    console.log("Path:", ctx.path);
                    console.log("Username:", body.username);
                    console.log("Password:", body.password ?? "(empty)");
                    console.log("--- End BEFORE Hook ---\n");

                    // Allow the request to continue to the endpoint
                    return { context: ctx };
                }),
            },
        ],
    },
}) satisfies BetterAuthPlugin;