import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { AuthService } from '../auth/auth.service.js';
import { UsersService } from '../auth/users.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from './service/staff.service.js';
import { StaffController } from './staff.controller.js';
@Module({
  providers: [
    StaffService,
    PrismaService,
    StaffFilesService,
    UsersService,
    AuthService,
  ],
  controllers: [StaffController],
})
export class StaffModule {}
