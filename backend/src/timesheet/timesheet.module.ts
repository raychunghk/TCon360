import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { UsersService } from '../auth/users.service.js';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from '../staff/service/staff.service.js';
import { TimesheetController } from './timesheet.controller.js';
import { TimesheetService } from './timesheet.service.js';
@Module({
  imports: [AuthModule],
  controllers: [TimesheetController],
  providers: [
    TimesheetService,
    PrismaService,
    LeaveRequestService,
    StaffService,
    UsersService,
    StaffFilesService,
  ],
})
export class TimesheetModule {}
