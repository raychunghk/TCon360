import secureSession from '@fastify/secure-session';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { env } from '@tcon360/config';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { resolve } from 'path';
import { AppModule } from './app.module.js';

// Load .env file from project root
//dotenv.config({ path: resolve(__dirname, '../../.env') });
async function bootstrap() {
  console.log('basepath:', env);
  let app: INestApplication;
  const usefastify = false;
  if (usefastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );
    await app.use(secureSession, {
      secret: env.JWT_SECRET,
      salt: 'mq9hDxBVDbspDR6n',
    });
  } else {
    app = await NestFactory.create(AppModule);
    console.log('using express');
    app.use(
      session({
        secret: env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1800000 },
      }),
    );
  }
  console.log('backend port', env.BACKEND_PORT);
  await app.listen(env.BACKEND_PORT);
}
bootstrap();
