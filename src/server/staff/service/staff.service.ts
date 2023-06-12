import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Staff, Prisma } from '@prisma/client';
import { PrismaClient } from "@prisma/client";

// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed


@Injectable()
export class StaffService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async createStaff(stfInfo: Prisma.StaffCreateInput): Promise<Staff> {
    console.log(stfInfo);
    const rtn = await this.prisma.staff.create({
      data: stfInfo,
    });
    console.log(rtn);
    return rtn;
  }
  getPrisma(){
    if(!this.prisma){
      return new PrismaClient();
    }else{
      return this.prisma;
    }
  }
  async getStaffById(id: string): Promise<Staff> {
    console.log('prisma ?'+this.prisma)
    const staff = await this.getPrisma().staff.findUnique({
      where: {
        id: 4,
      },
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${id} not found`);
    }
    return staff;
  }
}