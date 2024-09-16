/** @format */

const { feconfig } = require("./frontend/frontendconfig");

const baseconfig = {
  ...feconfig,
  backendport: 3800,
};

module.exports = { baseconfig };
