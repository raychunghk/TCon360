
const proxypath = "/absproxy";
const frontendport = 3000;
const useReverseProxy = false;
const mainport = useReverseProxy ? 3333 : frontendport;

module.exports = {
  proxypath: proxypath,
  useReverseProxy: useReverseProxy,
  frontendport,
  mainport,
  prefix: `${proxypath}/${mainport}`,
  basepath: `${proxypath}/${mainport}`,
  feprefix: `${proxypath}/${frontendport}`,
};
