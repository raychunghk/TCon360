import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { staffFiles } from '@prisma/client';

@Injectable()
export class StaffFilesService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.staffFiles.findUnique({ where: { id } });
  }

  async update(id: number, data: {
    filePath?: string;
    fileType?: string;
    staffId?: number;
  }): Promise<staffFiles> {
    return this.prisma.staffFiles.update({ where: { id }, data });
  }

  async remove(id: number): Promise<staffFiles> {
    return this.prisma.staffFiles.delete({ where: { id } });
  }
}