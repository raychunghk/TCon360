/** @format */

const Fastify = require("fastify");
const proxy = require("@fastify/http-proxy");

const fastify = Fastify();
const config = require("./baseconfig");
const { baseconfig } = config;
const { prefix: _prefix, frontendport, backendport, mainport } = baseconfig;
const _frontendurl = `http://127.0.0.1:${frontendport}`;
const _backendurl = `http://127.0.0.1:${backendport}`;

console.log("_frontendurl", _frontendurl);
console.log("_backendurl", _backendurl);

// Proxy for /api/auth/* requests to frontend
fastify.register(proxy, {
  upstream: `${_frontendurl}/api/auth`,
  prefix: `${_prefix}/api/auth`,
  websocket: true,
  preHandler: (request, reply, done) => {
    if (request.url.startsWith(`${_prefix}/api/auth`)) {
      console.log("API Auth called");
      console.log("url", request.url);
    }
    done();
  },
});

// Proxy for other API requests to backend
fastify.register(proxy, {
  upstream: `${_backendurl}/api`,
  prefix: `${_prefix}/api`,
  websocket: true,
  // rewritePrefix: `${_prefix}/api`,
  preHandler: (request, reply, done) => {
    if (request.url.startsWith(`${_prefix}/api/auth`)) {
      console.log("call not found");
      reply.callNotFound();
    } else {
      console.log("done");
      done();
    }
  },
});

// Proxy for frontend requests
fastify.register(proxy, {
  upstream: _frontendurl,
  prefix: _prefix,
  websocket: true,
});

fastify.addHook("preValidation", async (request, reply) => {
  console.log(`Proxy server: Request URL: ${request.url}`);
});

fastify.listen(mainport, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
