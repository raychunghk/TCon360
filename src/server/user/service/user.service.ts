import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UserInfo, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Prisma.UserInfoCreateInput): Promise<UserInfo> {
    console.log(data);
    return this.prisma.userInfo.create({
      data,
    });
  }
}
