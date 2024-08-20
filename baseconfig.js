/** @format */

const baseconfig = {
  proxypath: "/absproxy",
  frontendport: 3000,
  backendport: 3800,
  mainport: 3333,
};

module.exports = {
  baseconfig: {
    ...baseconfig,
    prefix: `${baseconfig.proxypath}/${baseconfig.mainport}`,
    basepath: `${baseconfig.proxypath}/${baseconfig.mainport}`,
  },
};
