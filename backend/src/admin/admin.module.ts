import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [PrismaService, AdminService],
})
export class AdminModule {}
