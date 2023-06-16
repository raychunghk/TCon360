import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: any): Promise<User> {
        let user;
        try {
            const user = await this.prisma.user.create({ data });
        } catch (error) {
            console.log(error)
        }
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }

    async updateUser(id: string, data: any): Promise<User> {
        const user = await this.prisma.user.update({ where: { id }, data });
        return user;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.prisma.user.delete({ where: { id } });
        return user;
    }
}