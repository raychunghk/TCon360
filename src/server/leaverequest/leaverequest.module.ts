import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leaverequest.controller';
import { LeaveRequestService } from './service/leaverequest.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeaveRequestResolver } from './leaverequest.resolver';
import { StaffService } from '../staff/service/staff.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { UsersService } from '../auth/users.service';

@Module({
  controllers: [LeaveRequestController],
  //providers: [LeaveRequestService, PrismaService,LeaveRequestResolver],
  providers: [
    LeaveRequestService,
    PrismaService,
    StaffService,
    StaffFilesService,
    UsersService
  ],
})
export class LeaveRequestModule {}
