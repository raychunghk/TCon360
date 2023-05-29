import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.setGlobalPrefix(`/absproxy/5000`);
  await app.listen(5000);
 /* if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }*/
}
bootstrap();
