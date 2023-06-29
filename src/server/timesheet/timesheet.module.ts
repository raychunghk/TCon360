import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { PrismaService } from 'src/server/prisma/prisma.service';
@Module({
  controllers: [TimesheetController]
  ,providers:[TimesheetService,PrismaService]
})
export class TimesheetModule {}
