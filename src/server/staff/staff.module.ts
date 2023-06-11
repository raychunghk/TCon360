import { Module } from '@nestjs/common';
import { StaffService } from './service/staff.service';
import { StaffController } from './controller/staff.controller';
import { PrismaService } from 'src/server/prisma/prisma.service';
@Module({
  providers: [StaffService, PrismaService],
  controllers: [StaffController],
})
export class StaffModule {}
