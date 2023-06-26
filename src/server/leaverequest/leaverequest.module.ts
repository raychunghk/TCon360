import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leaverequest.controller';
import { LeaveRequestService } from './service/leaverequest.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeaveRequestResolver } from './leaverequest.resolver';
import { StaffService } from '../staff/service/staff.service';

@Module({
  controllers: [LeaveRequestController],
  //providers: [LeaveRequestService, PrismaService,LeaveRequestResolver],
  providers: [LeaveRequestService, PrismaService, StaffService],
})
export class LeaveRequestModule {}