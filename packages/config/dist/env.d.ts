/** @format */
export declare const env: Readonly<{
    NODE_ENV: "development" | "production" | "test";
    JWT_SECRET: string;
    PROXY_PATH: string;
    FRONTEND_PORT: number;
    BACKEND_PORT: number;
    USE_REVERSE_PROXY: boolean;
    TOKEN_MAX_AGE: number;
}>;
