import { Injectable } from '@nestjs/common';
import { staffFiles } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { BaseService } from './base.service.js';

@Injectable()
export class StaffFilesService extends BaseService {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

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
