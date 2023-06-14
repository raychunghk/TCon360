require('dotenv').config();
const proxypath = process.env.PROXYPATH?process.env.PROXYPATH:'/absproxy';
const myport = process.env.PORT;

console.log(proxypath) ;
 


const port = process.env.PORT?process.env.PORT:'5000';
export const basepath = `${proxypath}/${port}`;
//module.exports= {port, basepath}
