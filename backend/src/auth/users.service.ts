import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
//import { User } from '.prisma/client.js';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: any): Promise<User> {
    let user;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }
  // async getUserWithStaffAndContract(userId: string) {
  //   try {
  //     const nestedObject = await this.prisma.user.findUnique({
  //       where: { id: userId },
  //       include: {
  //         staff: {
  //           include: {
  //             contracts: true,
  //           },
  //         },
  //       },
  //     });

  //     return nestedObject;
  //   } catch (error) {
  //     console.log('Error retrieving nested object:', error);
  //   }
  // }

  async getUserWithStaffAndContract(userId: string) {
    try {
      const nestedObject = await this.prisma.user.findUnique({
        where: { id: userId },

        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
          staff: {
            select: {
              id: true,
              StaffName: true,
              AgentName: true,
              StaffCategory: true,
              Department: true,
              PostUnit: true,
              ManagerName: true,
              ManagerTitle: true,
              ManagerEmail: true,
              userId: true,
              contracts: {
                select: {
                  id: true,
                  ContractStartDate: true,
                  ContractEndDate: true,
                  AnnualLeave: true,
                  staffId: true,
                  IsActive: true,
                },
              },
            },
          },
        },
      });

      return nestedObject;
    } catch (error) {
      console.log('Error retrieving nested object:', error);
    }
  }
  async getUserWithViewStaff(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { viewStaff: true },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

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

  async findUserByIdentifier(identifier: string): Promise<User | null> {
    let user: User | null = null;

    if (identifier.includes('@')) {
      user = await this.prisma.user.findUnique({
        where: { email: identifier },
      });
    } else {
      user = await this.prisma.user.findUnique({
        where: { username: identifier },
      });
    }
    return user;
  }
}
