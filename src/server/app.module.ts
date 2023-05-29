import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//import { DynamicModule, Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { CatController } from '../cat/cat.controller';
import { CatsController } from '../cats/cats.controller';
import { CatsService } from '../cats/cats.service';
import { CatsModule } from '../cats/cats.module';
//import { NODE_ENV } from 'src/shared/constants/env';
//import { RenderModule } from 'nest-next';
//import Next from 'next';
@Module({
  /* should pass a NEXT.js server instance
      as the argument to `forRootAsync` */
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: true }),
      /* null means that nest-next 
                should look for pages in root dir */
      { viewsDir: null },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
