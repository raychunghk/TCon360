import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Staff, Prisma } from '@prisma/client';
import { PrismaClient } from "@prisma/client";

// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed


@Injectable()
export class StaffService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) { }

  async createStaff(stfInfo: Prisma.StaffCreateInput, _userId:String): Promise<Staff> {
    console.log(stfInfo);
    const stfWithUserId = { ...stfInfo, userId: _userId};
    const rtn = await this.prisma.staff.create({
      data: stfInfo,
      user: { connect: { id:_userId} }  
    });
    console.log(rtn);
    return rtn;
  }
  getPrisma() {
    if (!this.prisma) {
      return new PrismaClient();
    } else {
      return this.prisma;
    }
  }
  async getStaffById(_id: number): Promise<Staff> {
    console.log('prisma ?' + this.prisma)
    const staff = await this.getPrisma().staff.findUnique({
      where: {
        id: _id,
      },
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${_id} not found`);
    }
    return staff;
  }
}