import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LeaveRequest, Prisma } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
  constructor(private prisma: PrismaService) {}

  async create(data: LeaveRequest): Promise<LeaveRequest> {
    
    return this.prisma.leaveRequest.create({ data });
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