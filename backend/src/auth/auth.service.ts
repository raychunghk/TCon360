import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { GoogleAuthDto, GoogleSignupDto, signupUserDTO } from '../models/customDTOs.js';
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
    if (user?.password && (await argon2.verify(user.password, password))) {
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

    const hashedPassword = password
      ? await argon2.hash(password, { type: argon2.argon2id })
      : null;

    try {
      // Use upsert to handle both new registrations and onboarding of social login users
      const user = await this.prisma.user.upsert({
        where: { email },
        update: {
          username: username || undefined,
          ...(hashedPassword ? { password: hashedPassword } : {}),
          name: staff.StaffName,
        },
        create: {
          email,
          ...(hashedPassword ? { password: hashedPassword } : {}),
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

      if (!user.password) {
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

  private async buildUniqueUsernameFromEmail(email: string): Promise<string | null> {
    const base = (email.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_]/g, '');
    let candidate = base || 'user';

    for (let i = 0; i < 25; i++) {
      const exists = await this.prisma.user.findFirst({ where: { username: candidate } });
      if (!exists) return candidate;
      candidate = `${base}${i + 1}`;
    }

    return null;
  }

  async handleGoogleSignup(googleData: GoogleSignupDto) {
    const { googleId, email, name, picture, staff } = googleData;

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { googleId }],
        },
      });

      const username = existingUser?.username ?? (await this.buildUniqueUsernameFromEmail(email));

      let user = existingUser
        ? await this.prisma.user.update({
            where: { id: existingUser.id },
            data: {
              email,
              googleId,
              ...(username ? { username } : {}),
              name: name || existingUser.name,
              image: picture || existingUser.image,
              ...(existingUser.password === '' ? { password: null } : {}),
            },
          })
        : await this.prisma.user.create({
            data: {
              email,
              googleId,
              ...(username ? { username } : {}),
              name,
              image: picture,
              password: null,
              userStatus: 'active',
            },
          });

      if (staff) {
        const staffExists = await this.prisma.staff.findFirst({ where: { userId: user.id } });

        if (!staffExists) {
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

          await this.prisma.user.update({
            where: { id: user.id },
            data: { staffId: staffRecord.id },
          });

          await this.prisma.staffContract.create({
            data: {
              ContractStartDate: new Date(staff.ContractStartDate),
              ContractEndDate: new Date(staff.ContractEndDate),
              AnnualLeave: staff.AnnualLeave,
              IsActive: true,
              staffId: staffRecord.id,
            },
          });

          user = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id } });
        }
      }

      const userWithDetails = await this.usersService.getUserWithStaffAndContract(user.id);

      const userWithViewStaff = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: { viewStaff: true },
      });

      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        staff: userWithViewStaff?.viewStaff ?? [],
      };

      const token = this.generateToken(payload);

      return { token, user: userWithDetails };
    } catch (error) {
      console.log('Google signup error', error);
      throw error;
    }
  }

  // Backward compatible alias (existing route: POST /api/auth/google-callback)
  async handleGoogleAuth(googleData: GoogleAuthDto) {
    const { id: googleId, email, name, picture, email_verified } = googleData;

    const result = await this.handleGoogleSignup({
      googleId,
      email,
      name,
      picture,
    });

    if (email_verified) {
      await this.prisma.user.update({
        where: { id: result.user.id },
        data: { emailVerified: new Date() },
      });
      const refreshedUser = await this.usersService.getUserWithStaffAndContract(result.user.id);
      return { token: result.token, user: refreshedUser };
    }

    return result;
  }
}
