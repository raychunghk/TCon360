import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import secureSession from '@fastify/secure-session';
import * as session from 'express-session';
//import Fastify from 'fastify';
//import { baseconfig } from '../../baseconfig.js';
import { INestApplication } from '@nestjs/common';
import { config } from '@tcon360/config';
import { AppModule } from './app.module.js';
async function bootstrap() {
  console.log('basepath', config);
  let app: INestApplication;
  const usefastify = false;
  if (usefastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );


    await app.use(secureSession, {
      secret: 'averylogphrasebiggerthanthirtytwochars',
      salt: 'mq9hDxBVDbspDR6n',
    });
  } else {
    app = await NestFactory.create(AppModule);


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
  await app.listen(config.backendport);
  /* if (module.hot) {
     module.hot.accept();
     module.hot.dispose(() => app.close());
   }*/
}
bootstrap();
