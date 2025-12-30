import type { BetterAuthPlugin } from "better-auth";

const customSignInResponsePlugin = (): BetterAuthPlugin => ({
    id: "custom-signin-response",
    hooks: {
        after: [
            {
                matcher: (ctx) => ctx.path === "/sign-in/credentials",
                handler: createAuthMiddleware(async (ctx) => {
                    if (ctx.context.returned && !ctx.context.error) {
                        const original = ctx.context.returned;
                        // Customize the response here
                        // Example: expose Nest.js token at top level, keep BetterAuth token as sessionToken
                        return ctx.json({
                            accessToken: original.user.tkn || original.user.nestJwt || null,
                            sessionToken: original.token,
                            user: original.user,
                            // Add any additional top-level fields if desired
                        });
                    }
                    // Continue with original response if not successful
                    return ctx.next();
                }),
            },
        ],
    },
});