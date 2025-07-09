import { Module } from '@nestjs/common';
import { HelloController } from './hello/hello.controller.js';

@Module({
  controllers: [HelloController],
})
export class HelloModule {}
