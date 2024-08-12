const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
console.log('process.env', process.env.NODE_ENV);
const baseconf = require('../baseconfig.js');
// Import base configuration
const { baseconfig } = baseconf;
console.log(baseconf);
//const app = next({ dev, assetPrefix: '/absproxy/2222' });
const app = next({ dev });
const handle = app.getRequestHandler();
//app.setAssetPrefix('/absproxy/2222');
app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    console.log('parseURL', parsedUrl);
    const frontendprefix = `${baseconfig.proxypath}/${baseconfig.frontendport}`;
    console.log('frontendprefix', frontendprefix);
    console.log('baseconfig.prefix', baseconfig.prefix);
    if (parsedUrl.pathname.startsWith(baseconfig.prefix)) {
      // Remove /absproxy/3333 from the pathname
      parsedUrl.pathname = parsedUrl.pathname.replace(baseconfig.prefix, '');
      console.log('start with 3333, change url:', parsedUrl.pathname);
    }
    if (parsedUrl.pathname.startsWith(frontendprefix)) {
      // Remove /absproxy/3333 from the pathname
      parsedUrl.pathname = parsedUrl.pathname.replace(frontendprefix, '');
      console.log('ParseURL condition frontendprefix:', parsedUrl.pathname);
    }
    if (parsedUrl.pathname.indexOf(':3000') > 0) {
      parsedUrl.pathname = parsedUrl.pathname.replace(':3000', `:${baseconf.frontendport}`);
      console.log('url contains port 3000', parsedUrl.pathname);
    }
    handle(req, res, parsedUrl);
  }).listen(baseconfig.frontendport, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${baseconfig.frontendport}`);
  });
});
