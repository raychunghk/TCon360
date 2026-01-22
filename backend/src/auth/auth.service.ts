import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { signupUserDTO, GoogleAuthDto } from '../models/customDTOs.js';
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

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async signUp(payload: signupUserDTO): Promise<User> {
    console.log('signup payload', payload);
    const { email, password, username, staff } = payload;

    const hashedPassword = password ? await argon2.hash(password, {
      type: argon2.argon2id,
    }) : undefined;

    try {
      // Use upsert to handle both new registrations and onboarding of social login users
      const user = await this.prisma.user.upsert({
        where: { email },
        update: {
          username: username || undefined,
          password: hashedPassword,
          name: staff.StaffName,
        },
        create: {
          email,
          password: hashedPassword || '', // Fallback for safety if somehow missing
          username,
          name: staff.StaffName,
          userStatus: 'active',
        },
      });

      // Create staff record
      const staffRecord = await this.prisma.staff.create({
        data: {
          StaffName: staff.StaffName,
          AgentName: staff.AgentName,
          StaffCategory: staff.StaffCategory,
          Department: staff.Department,
          PostUnit: staff.PostUnit,
          ManagerName: staff.ManagerName,
          ManagerTitle: staff.ManagerTitle,
          ManagerEmail: staff.ManagerEmail,
          userId: user.id,
        },
      });

      // Update user with staffId
      await this.prisma.user.update({
        where: { id: user.id },
        data: { staffId: staffRecord.id },
      });

      const contractStartDate = new Date(staff.ContractStartDate);
      const contractEndDate = new Date(staff.ContractEndDate);

      await this.prisma.staffContract.create({
        data: {
          ContractStartDate: contractStartDate,
          ContractEndDate: contractEndDate,
          AnnualLeave: staff.AnnualLeave,
          IsActive: true,
          staffId: staffRecord.id,
        },
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
        where: { id: user.id },
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

  async login(
    identifier: string,
    password: string,
    options?: { excludeViewStaff?: boolean },
  ) {
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

      // Fetch full user details (including contracts) regardless
      const userWithDetails = await this.usersService.getUserWithStaffAndContract(user.id);

      // Build JWT payload – conditionally exclude viewStaff
      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        // Only include viewStaff if explicitly allowed (default: include)
        ...(options?.excludeViewStaff !== true && { staff: user.viewStaff }),
      };

      token = this.jwtService.sign(payload);
      console.log(`token generated:`, token);
      const decoded = this.jwtService.verify(token);
      console.log('just signed in decoded token in nest.js', decoded);

      return { token, user: userWithDetails };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async handleGoogleAuth(googleData: GoogleAuthDto) {
    const { id: googleId, email, name, picture, email_verified } = googleData;

    try {
      // Check if user exists by email
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email
        },
        include: {
          viewStaff: true,
        }
      });

      let user;
      if (existingUser) {
        // Update existing user with Google account info
        user = await this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: name || existingUser.name,
            image: picture || existingUser.image,
            emailVerified: email_verified ? new Date() : existingUser.emailVerified,
          },
          include: {
            viewStaff: true,
          }
        });
      } else {
        // Create new user with Google account
        user = await this.prisma.user.create({
          data: {
            email,
            username: email.split('@')[0], // Use email prefix as username
            name,
            image: picture,
            emailVerified: email_verified ? new Date() : null,
            userStatus: 'active',
          },
          include: {
            viewStaff: true,
          }
        });
      }

      // Fetch full user details (including contracts) regardless
      const userWithDetails = await this.usersService.getUserWithStaffAndContract(user.id);

      // Build JWT payload
      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        staff: user.viewStaff,
      };

      const token = this.jwtService.sign(payload);
      console.log(`Google auth token generated:`, token);
      const decoded = this.jwtService.verify(token);
      console.log('Google auth decoded token in nest.js', decoded);

      return { token, user: userWithDetails };
    } catch (error) {
      console.log('Google auth error', error);
      throw error;
    }
  }
}