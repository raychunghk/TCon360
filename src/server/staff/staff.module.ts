import { Module } from '@nestjs/common';
import { StaffService } from './service/staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from 'src/server/prisma/prisma.service';
import { StaffFilesService } from '../shared/staffFiles.service';
@Module({
  providers: [StaffService, PrismaService, StaffFilesService],
  controllers: [StaffController],
})
export class StaffModule {}
