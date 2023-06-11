import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/server/prisma/prisma.service';
@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
