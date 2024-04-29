/** @format */

const Fastify = require("fastify");
const proxy = require("@fastify/http-proxy");

const fastify = Fastify();
const config = require("./baseconfig");
const baseconfig = config.baseconfig;
const _prefix = baseconfig.prefix;
const _frontendurl = `http://127.0.0.1:${baseconfig.frontendport}`;
const _backendendurl = `http://127.0.0.1:${baseconfig.backendport}`;
console.log("_frontendurl", _frontendurl);
console.log("_backendendurl", _backendendurl);
fastify.register(proxy, {
  upstream: _backendendurl,
  prefix: `${_prefix}/api`, // optional
});
fastify.register(proxy, {
  upstream: _frontendurl,
  prefix: _prefix, // optional
});

fastify.addHook("preValidation", async (request, reply) => {
  console.log(`Proxy server:Request URL: ${request.url}`);
});

fastify.listen(baseconfig.mainport, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
