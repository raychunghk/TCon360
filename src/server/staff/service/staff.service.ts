import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Staff, Prisma } from '@prisma/client';
@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}
  async createStaff(stfInfo: Prisma.StaffCreateInput): Promise<Staff> {
    console.log(stfInfo);
    const rtn = await this.prisma.staff.create({
      data: stfInfo,
    });
    console.log(rtn);
    return rtn;
  }
  async getStaffById(id: string): Promise<Staff> {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${id} not found`);
    }
    return staff;
  }
}
