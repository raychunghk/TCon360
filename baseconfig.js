/** @format */

//const { feconfig } = require("./frontend/frontendconfig");
//import * as feconfig from './frontend/frontendconfig'; // Correct relative path
const feconfig = require('./frontend/frontendconfig');

const baseconfig = {
  ...feconfig,
  backendport: 3800,
};

//console.log('baseconfig', baseconfig);
//console.log('feconfig', feconfig);

module.exports = { baseconfig };