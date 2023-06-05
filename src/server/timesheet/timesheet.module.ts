import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './service/timesheet.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [TimesheetController]
  ,providers:[TimesheetService,PrismaService]
})
export class TimesheetModule {}
