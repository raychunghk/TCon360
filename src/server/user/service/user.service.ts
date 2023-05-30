import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UserInfo, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(uinfo: Prisma.UserInfoCreateInput): Promise<UserInfo> {
    console.log(uinfo);
    const rtn = await this.prisma.userInfo.create({
      data:uinfo
    });
    console.log(rtn);
    return rtn;
  }
}
