import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LeaveRequest, Prisma } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
  constructor(private prisma: PrismaService) { }
  async createLeaveRequestforgql(leaveRequestData) {
    const createdLeaveRequest = await this.prisma.leaveRequest.create({
      data: leaveRequestData
    });
    return createdLeaveRequest;
  }
  async create(staffId: number, data: Prisma.LeaveRequestCreateInput) {
    const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
    if (!staff) {
      throw new Error(`Staff member with ID ${staffId} not found`);
    }
    Logger.log("staff?", staff)
    try {
      const leaveRequest = await this.prisma.leaveRequest.create({ data });
      return leaveRequest;
    } catch (error) {
      Logger.error(`Failed to create leave request: ${error}`);
      throw error;
    }
    return null;
  }
  async findAll(): Promise<LeaveRequest[]> {
    return this.prisma.leaveRequest.findMany();
  }

  async findOne(id: number): Promise<LeaveRequest> {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async update(params: {
    id: number;
    data: Prisma.LeaveRequestUpdateInput;
  }): Promise<LeaveRequest> {
    const { id, data } = params;
    await this.prisma.leaveRequest.update({ where: { id }, data });
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.leaveRequest.delete({ where: { id } });
  }
}