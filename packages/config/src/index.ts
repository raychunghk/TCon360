/** @format */

import { env } from "./env";

const proxypath = env.PROXY_PATH;
const frontendport = env.FRONTEND_PORT;
const backendport = env.BACKEND_PORT;
const useReverseProxy = env.USE_REVERSE_PROXY;
const mainport = useReverseProxy ? 3333 : frontendport;
const isProduction = env.NODE_ENV === "production";
const basePathEnabled = env.BASE_PATH_ENABLED;

export const config = {
  proxypath,
  useReverseProxy,
  frontendport,
  backendport,
  mainport,
  prefix: (isProduction || !basePathEnabled) ? "" : `${proxypath}/${mainport}`,
  basepath: (isProduction || !basePathEnabled) ? "" : `${proxypath}/${mainport}`,
  feprefix: (isProduction || !basePathEnabled) ? "" : `${proxypath}/${frontendport}`
};

export * from "./env";