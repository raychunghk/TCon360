/** @format */

const feconfig = {
    proxypath: "/absproxy",
    frontendport: 3000,
    mainport: 3333,
 
};

 
module.exports = {
  feconfig: {
    ...feconfig,
    prefix: `${feconfig.proxypath}/${feconfig.mainport}`,
    basepath: `${feconfig.proxypath}/${feconfig.mainport}`,
  },
};
