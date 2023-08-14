import Next from 'next';
 

   
const app =   Next({ dev: true })
app.prepare();
console.log(app)
export default app;