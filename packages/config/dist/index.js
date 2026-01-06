/** @format */
import { env } from "./env.js";
const proxypath = env.PROXY_PATH;
const frontendport = env.FRONTEND_PORT;
const backendport = env.BACKEND_PORT;
const useReverseProxy = env.USE_REVERSE_PROXY;
const mainport = useReverseProxy ? 3333 : frontendport;
const isProduction = env.NODE_ENV === "production";
const basePathEnabled = env.BASE_PATH_ENABLED;
// NEW: Export the auth switch for use in middleware and other places
const useBetterAuth = env.USE_BETTER_AUTH;
export const config = {
    proxypath,
    useReverseProxy,
    frontendport,
    backendport,
    mainport,
    prefix: isProduction || !basePathEnabled ? "" : `${proxypath}/${mainport}`,
    basepath: isProduction || !basePathEnabled ? "" : `${proxypath}/${mainport}`,
    feprefix: isProduction || !basePathEnabled ? "" : `${proxypath}/${frontendport}`,
    useBetterAuth, // ← added
};
export * from "./env.js";
//# sourceMappingURL=index.js.map