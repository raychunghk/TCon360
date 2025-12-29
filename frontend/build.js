// frontend/build-with-log.js
console.log(`build-with-log: JWT_SECRET=${process.env.JWT_SECRET}`);
console.log(`build-with-log: JWT_SECRET length=${process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 'undefined'}`);
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('child_process').execSync('next build', { stdio: 'inherit' });