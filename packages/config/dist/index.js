/** @format */
import { env } from "./env.js";
const proxypath = env.PROXY_PATH;
const frontendport = env.FRONTEND_PORT;
const backendport = env.BACKEND_PORT;
const useReverseProxy = env.USE_REVERSE_PROXY;
const mainport = useReverseProxy ? 3333 : frontendport;
const isProduction = env.NODE_ENV === "production";
export const config = {
    proxypath,
    useReverseProxy,
    frontendport,
    backendport,
    mainport,
    prefix: isProduction ? "" : `${proxypath}/${mainport}`,
    basepath: isProduction ? "" : `${proxypath}/${mainport}`,
    feprefix: isProduction ? "" : `${proxypath}/${frontendport}`,
};
export * from "./env.js";
//# sourceMappingURL=index.js.map