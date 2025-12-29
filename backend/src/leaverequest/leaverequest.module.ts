import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { LeaveRequestController } from './leaverequest.controller.js';
import { LeaveRequestService } from './service/leaverequest.service.js';
//import { LeaveRequestResolver } from './leaverequest.resolver.js';
import { UsersService } from '../auth/users.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from '../staff/service/staff.service.js';

@Module({
  controllers: [LeaveRequestController],
  //providers: [LeaveRequestService, PrismaService,LeaveRequestResolver],
  providers: [
    LeaveRequestService,
    PrismaService,
    StaffService,
    StaffFilesService,
    UsersService,
  ],
})
export class LeaveRequestModule {}
