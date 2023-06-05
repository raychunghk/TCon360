import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './service/timesheet.service';
@Module({
  controllers: [TimesheetController]
  ,providers:[TimesheetService]
})
export class TimesheetModule {}
