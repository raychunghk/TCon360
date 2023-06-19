import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyStatic } from 'fastify-static';
import { join } from 'path';
import { RenderService } from 'nest-next';
import secureSession from '@fastify/secure-session';
import session from 'express-session';
import Fastify from 'fastify'
import Next from 'next';
import { INestApplication } from '@nestjs/common';
async function bootstrap() {
  let app:INestApplication
  const usefastify = false;
  if (usefastify) {
    // const nextjs = Next({ dev: true, });
    // await nextjs.prepare();
    // const fastify = Fastify();
    //  fastify.addHook('onRequest', (req, reply, next) => {
    //    reply['render'] = async (path, data = {}) => {
    //      req.query = data;
    //      await nextjs.render(req.raw, reply., path, req.query, {});
    //    };
    //    next();
    //  });
    
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    app.setGlobalPrefix(`/absproxy/5000`);

    await app.use(secureSession, {
      secret: 'averylogphrasebiggerthanthirtytwochars',
      salt: 'mq9hDxBVDbspDR6n',
    });

    
  }
  else {
    app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(`/absproxy/5000`);

    //const service = app.get(RenderService);

    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1800000 } ,
      }),
    );
    
  }
  await app.listen(5000);
  /* if (module.hot) {
     module.hot.accept();
     module.hot.dispose(() => app.close());
   }*/
}
bootstrap();
