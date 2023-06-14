import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {basepath} from '../../global'
import { LoggerMiddleware } from './logger/logger.middleware';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  console.log('basepath:?'+basepath)
  app.setGlobalPrefix(basepath);
  app.use(new LoggerMiddleware().use);
  await app.listen(5000);
 /* if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }*/
}
bootstrap();
