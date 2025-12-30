import { PrismaService } from '../prisma/prisma.service.js';

export abstract class BaseService {
    protected readonly prisma: PrismaService['client'];

    constructor(prismaService: PrismaService) {
        this.prisma = prismaService.client;
    }
}