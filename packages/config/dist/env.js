/** @format */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),
        JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
        PROXY_PATH: z.string().default("/absproxy"),
        FRONTEND_PORT: z.coerce.number().default(3000),
        BACKEND_PORT: z.coerce.number().default(3800),
        USE_REVERSE_PROXY: z
            .enum(["true", "false"])
            .default("false")
            .transform((val) => val === "true"),
        TOKEN_MAX_AGE: z.coerce
            .number()
            .int()
            .min(1000, "TOKEN_MAX_AGE must be at least 1000 ms")
            .default(113000),
    },
    client: {},
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        JWT_SECRET: process.env.JWT_SECRET,
        PROXY_PATH: process.env.PROXY_PATH,
        FRONTEND_PORT: process.env.FRONTEND_PORT,
        BACKEND_PORT: process.env.BACKEND_PORT,
        USE_REVERSE_PROXY: process.env.USE_REVERSE_PROXY,
        TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    },
    skipValidation: !!process.env.CI,
});
//# sourceMappingURL=env.js.map