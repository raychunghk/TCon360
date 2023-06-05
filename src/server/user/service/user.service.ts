import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Staff, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(stfInfo: Prisma.StaffCreateInput): Promise<Staff> {
    console.log(stfInfo);
    const rtn = await this.prisma.staff.create({
      data: stfInfo,
    });
    console.log(rtn);
    return rtn;
  }
}
