const dotenv = require('dotenv');
dotenv.config();
export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const NODE_ENV = process.env.NODE_ENV;

export const PORT = process.env.PORT || 5000;

export const basePath = `${process.env.PROXYPATH}${process.env.PORT}`;
console.log(basePath);
console.log(PORT);
