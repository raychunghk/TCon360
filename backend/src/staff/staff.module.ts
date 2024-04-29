import { Module } from '@nestjs/common';
import { StaffService } from './service/staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { UsersService } from '../auth/users.service';
import { AuthService } from '../auth/auth.service';
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
