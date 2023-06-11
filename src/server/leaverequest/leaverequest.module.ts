import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leaverequest.controller';
import { LeaveRequestService } from './service/leaverequest.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, PrismaService],
})
export class LeaveRequestModule {}