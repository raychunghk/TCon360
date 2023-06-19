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
async function bootstrap() {






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
    let app: NestFastifyApplication;
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    app.setGlobalPrefix(`/absproxy/5000`);

    await app.register(secureSession, {
      secret: 'averylogphrasebiggerthanthirtytwochars',
      salt: 'mq9hDxBVDbspDR6n',
    });

    await app.listen(5000);
  }
  else {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(`/absproxy/5000`);

    //const service = app.get(RenderService);

    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
    );
    await app.listen(5000);
  }

  /* if (module.hot) {
     module.hot.accept();
     module.hot.dispose(() => app.close());
   }*/
}
bootstrap();
