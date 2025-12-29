import { Module } from '@nestjs/common';
import { VacationsController } from './vacations.controller.js';
import { VacationsService } from './vacations/vacations.service.js';

@Module({
  controllers: [VacationsController],
  providers: [VacationsService],
})
export class VacationsModule {}
