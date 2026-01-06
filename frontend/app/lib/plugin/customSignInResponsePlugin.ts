// src/app/lib/auth/plugins/customSignInResponsePlugin.ts
import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware } from "better-auth/plugins";

export const customSignInResponsePlugin = (): BetterAuthPlugin => ({
    id: "custom-signin-response",
    hooks: {
        after: [
            {
                matcher: (ctx) => ctx.path === "/sign-in/credentials",
                handler: createAuthMiddleware(async (ctx) => {
                    if (ctx.context.returned && !ctx.context.error) {
                        const original = ctx.context.returned;
                        const newSession = ctx.context.newSession;


                        const extUser = newSession?.user;

                        console.log(
                            '[Plugin] Intercepted Response:',
                            JSON.stringify(original, null, 2)
                        );
                        const rtnObj = ctx.json({
                            ...original,
                            extUser,
                            session: {
                                expiresAt: newSession?.session.expiresAt ?? null,
                                createdAt: newSession?.session.createdAt ?? null,
                            },
                        });
                        console.log(`Login Return object`, rtnObj)
                        return rtnObj;
                    }

                    // Fallback: return the original response if conditions are not met
                    return ctx.context.returned;
                }),
            },
        ],
    },
});