import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { env } from '@tcon360/config';
import * as argon2 from 'argon2';
import { differenceInSeconds, format } from 'date-fns';
import { signupUserDTO } from '../models/customDTOs.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { BaseService } from '../shared/base.service.js';
import { StaffService } from '../staff/service/staff.service.js';
import { UsersService } from './users.service.js';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private staffService: StaffService,
  ) {
    super(prismaService);
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  decodejwt(token: string): any {
    return this.jwtService.verify(token);
  }

  async signUp(payload: signupUserDTO): Promise<User> {
    console.log('signup payload', payload);
    const { email, password, username, staff } = payload;

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    try {
      const createdUserWithStaff = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          name: staff.StaffName,
          staff: {
            create: {
              StaffName: staff.StaffName,
              AgentName: staff.AgentName,
              StaffCategory: staff.StaffCategory,
              Department: staff.Department,
              PostUnit: staff.PostUnit,
              ManagerName: staff.ManagerName,
              ManagerTitle: staff.ManagerTitle,
              ManagerEmail: staff.ManagerEmail,
            },
          },
        },
        include: {
          staff: true,
        },
      });

      const contractStartDate = new Date(staff.ContractStartDate);
      const contractEndDate = new Date(staff.ContractEndDate);

      const createdStaffContract = await this.prisma.staffContract.create({
        data: {
          ContractStartDate: contractStartDate,
          ContractEndDate: contractEndDate,
          AnnualLeave: staff.AnnualLeave,
          IsActive: true,
          staffId: createdUserWithStaff.staff[0].id,
        },
      });

      const updatedUser = await this.prisma.user.update({
        where: { id: createdUserWithStaff.id },
        data: { staffId: createdUserWithStaff.staff[0].id },
      });

      const userWithStaff = await this.prisma.user.findFirst({
        include: {
          viewStaff: true,
          staff: {
            include: {
              contracts: true,
            },
          },
        },
        where: { username: updatedUser.username },
      });

      return userWithStaff;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async userExists(_username: string, _email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: _email }, { username: _username }],
      },
    });
    return !!user;
  }

  async login(identifier: string, password: string) {
    let token = '';
    try {
      const user = await this.prisma.user.findFirst({
        include: {
          viewStaff: true,
        },
        where: {
          userStatus: 'active',
          OR: [{ email: identifier }, { username: identifier }],
        },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      const userWithDetails = await this.usersService.getUserWithStaffAndContract(user.id);
      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        staff: user.viewStaff,
      };

      // Use JwtModule's configured expiresIn, fallback to TOKEN_MAX_AGE
      const tokenage = (env.TOKEN_MAX_AGE || 113000) / 1000 / 60; // Convert ms to minutes
      console.log(`env.TOKEN_MAX_AGE`, env.TOKEN_MAX_AGE);
      console.log(
        'creating token on server, token max age in minutes',
        tokenage,
      );
      token = this.jwtService.sign(payload); // No options needed, JwtModule handles expiresIn

      // Verify the token
      const decoded = this.jwtService.verify(token);

      console.log('just signed in decoded token in nest.js');
      console.log(decoded);
      console.log('now?', new Date());

      const iat = new Date(decoded.iat * 1000);
      console.log('Token iat on:', iat);

      const expDate = decoded.exp * 1000;
      const formattedExpDate = format(expDate, 'yyyy-MM-dd hh:mm:ss');
      console.log('formattedExpDate:', formattedExpDate);

      const timeToExpInSeconds = differenceInSeconds(expDate, Date.now());
      console.log('time to expire from now (seconds):', timeToExpInSeconds);

      return { token, user: userWithDetails };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
