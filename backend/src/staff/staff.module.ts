import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { UsersService } from '../auth/users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from './service/staff.service.js';
import { StaffController } from './staff.controller.js';

@Module({
  imports: [AuthModule],
  providers: [StaffService, PrismaService, StaffFilesService, UsersService],
  controllers: [StaffController],
})
export class StaffModule {}
