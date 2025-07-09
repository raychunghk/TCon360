import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { AuthService } from '../auth/auth.service.js';
import { UsersService } from '../auth/users.service.js';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from '../staff/service/staff.service.js';
import { TimesheetController } from './timesheet.controller.js';
import { TimesheetService } from './timesheet.service.js';
@Module({
  controllers: [TimesheetController],
  providers: [
    TimesheetService,
    PrismaService,
    LeaveRequestService,
    StaffService,
    UsersService,
    AuthService,
    StaffFilesService,
  ],
})
export class TimesheetModule {}
