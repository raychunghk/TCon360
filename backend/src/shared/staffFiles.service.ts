import { Injectable } from '@nestjs/common';
import { staffFiles } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StaffFilesService {
  //constructor(private readonly prisma: PrismaService['client']) { }
  constructor(private readonly psm: PrismaService) { }
prisma = this.psm.client
  async create(data: {
    filePath: string;
    fileType: string;
    staffId: number;
  }): Promise<staffFiles> {
    return this.prisma.staffFiles.create({ data });
  }

  async findAll(): Promise<staffFiles[]> {
    return this.prisma.staffFiles.findMany();
  }

  async findOne(id: number): Promise<staffFiles> {
    return this.prisma.staffFiles.findUnique({ where: { id: Number(id) } });
  }

  async update(
    id: number,
    data: {
      filePath?: string;
      fileType?: string;
      staffId?: number;
    },
  ): Promise<staffFiles> {
    return this.prisma.staffFiles.update({ where: { id }, data });
  }

  async remove(id: number): Promise<staffFiles> {
    return this.prisma.staffFiles.delete({ where: { id } });
  }
}
