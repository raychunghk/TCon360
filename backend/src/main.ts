import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyStatic } from 'fastify-static';
import { join } from 'path';
//import { RenderService } from 'nest-next';
import secureSession from '@fastify/secure-session';
import * as session from 'express-session';
//import Fastify from 'fastify';

//import Next from 'next';
import { baseconfig } from '../../baseconfig.js';
import { INestApplication } from '@nestjs/common';
async function bootstrap() {
  console.log('basepath', baseconfig);
  let app: INestApplication;
  const usefastify = false;
  if (usefastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );

    //const appPrefix = `/absproxy/${basepath.backendport}`;
    // app.setGlobalPrefix(appPrefix);

    await app.use(secureSession, {
      secret: 'averylogphrasebiggerthanthirtytwochars',
      salt: 'mq9hDxBVDbspDR6n',
    });
  } else {
    app = await NestFactory.create(AppModule);
    //app.setGlobalPrefix(appPrefix);

    //const service = app.get(RenderService);
    console.log('using express');
    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1800000 },
      }),
    );
  }
  await app.listen(baseconfig.backendport);
  /* if (module.hot) {
     module.hot.accept();
     module.hot.dispose(() => app.close());
   }*/
}
bootstrap();
