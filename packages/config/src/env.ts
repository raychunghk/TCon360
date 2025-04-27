/** @format */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PROXY_PATH: z.string().default("/absproxy"),
    FRONTEND_PORT: z.coerce.number().default(3000),
    BACKEND_PORT: z.coerce.number().default(3800),
    USE_REVERSE_PROXY: z
      .enum(["true", "false"])
      .default("false")
      .transform((val) => val === "true"),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PROXY_PATH: process.env.PROXY_PATH,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    BACKEND_PORT: process.env.BACKEND_PORT,
    USE_REVERSE_PROXY: process.env.USE_REVERSE_PROXY,
  },
  skipValidation: !!process.env.CI,
});
