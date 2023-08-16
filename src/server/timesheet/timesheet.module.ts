import { Module } from '@nestjs/common';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { PrismaService } from 'src/server/prisma/prisma.service';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { StaffService } from '../staff/service/staff.service';
import { UsersService } from '../auth/users.service';
import { AuthService } from '../auth/auth.service';
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
