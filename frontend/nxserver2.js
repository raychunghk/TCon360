const baseconf = require('../baseconfig.js');
// Import base configuration
const { baseconfig } = baseconf;
const cli = require('next/dist/cli/next-start');
//cli.nextStart(['-p', process.env.PORT || baseconf.frontendport]);
cli.nextStart(['-p', baseconf.frontendport]);
