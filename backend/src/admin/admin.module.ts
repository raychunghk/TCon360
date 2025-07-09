import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';

@Module({
  controllers: [AdminController],
  providers: [PrismaService, AdminService],
})
export class AdminModule {}
