import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { NextModule } from './next/next.module';
import { NextMiddleware } from './next/next.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
@Module({
  imports: [CatsModule, NextModule],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    AppModule.handleAssets(consumer);
  }

  // 注意：这里很重要，_next*是nextjs静态资源请求的前缀，这里这么处理是将静态资源相关的请求由Nest转交个Next处理
  private static handleAssets(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware).forRoutes({
      path: '_next*',
      method: RequestMethod.GET,
    });
  }
}
