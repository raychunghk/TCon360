import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwtpayload.interface';
import { StaffService } from '../staff/service/staff.service';
import { signupUserDTO } from 'src/models/customDTOs';
import { differenceInSeconds, format } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    private readonly prisma: PrismaService,
    private staffService: StaffService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  decodejwt(token: string): any {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }

  async signUp(payload: signupUserDTO): Promise<User> {
    console.log('signup layload', payload);
    let userReturn;
    // const { staff, ...userData } = user;
    // const stf: any = { ...staff };
    // console.log('staff?');
    // console.log(stf);
    const { email, password, username, staff } = payload;

    // Create the objects

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    //user: { connect: { id: _userId } }
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
      // const createdUser = await this.prisma.user.create({
      //   data: {
      //     email,
      //     password: hashedPassword,
      //     username,
      //     name: staff.StaffName,
      //   },
      // });

      // // Create Staff
      // const createdStaff = await this.prisma.staff.create({
      //   data: {
      //     StaffName: staff.StaffName,
      //     AgentName: staff.AgentName,
      //     StaffCategory: staff.StaffCategory,
      //     Department: staff.Department,
      //     PostUnit: staff.PostUnit,
      //     ManagerName: staff.ManagerName,
      //     ManagerTitle: staff.ManagerTitle,
      //     ManagerEmail: staff.ManagerEmail,
      //     user: { connect: { id: createdUser.id } },
      //   },
      // });

      // // Create StaffContract
      // const contractStartDate = new Date(staff.ContractStartDate);
      // const contractEndDate = new Date(staff.ContractEndDate);

      // const createdStaffContract = await this.prisma.staffContract.create({
      //   data: {
      //     ContractStartDate: contractStartDate,
      //     ContractEndDate: contractEndDate,
      //     AnnualLeave: staff.AnnualLeave,
      //     IsActive: true,
      //     staff: { connect: { id: createdStaff.id } },
      //   },
      // });

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
        }, // Include staffContract relation
        where: { username: updatedUser.username },
      });
      return userWithStaff;
    } catch (error) {
      console.log(error);
    }
  }
  async userExists(_username: string, _email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: _email }, { username: _username }],
      },
    });
    let rtn = false;
    if (user) rtn = true;
    return rtn;
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

      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        staff: user.viewStaff,
      };
      const tokenage = parseInt(process.env.TOKEN_MAX_AGE) / 60;
      console.log(
        'creating token on server , token max age in seconds',
        tokenage,
      );
      const options = {
        expiresIn: `${tokenage}m`, // token expires in 1 minute
      };
      console.log('jwt options', options);

      token = this.jwtService.sign(payload, options);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Print the decoded token
      console.log('just signed in decoded token in nest.js');
      console.log(decoded);
      console.log('now?', new Date());

      const iat = new Date(decoded['iat'] * 1000);

      console.log('Token iat  on:', iat);
      const expDate = decoded['exp'] * 1000;

      const formattedExpDate = format(expDate, 'yyyy-MM-dd hh:mm:ss');
      console.log('formattedExpDate:', formattedExpDate); // Output: 2023-02-06 07:12:17

      const timeToExpInSeconds = differenceInSeconds(expDate, Date.now());
      console.log('time to expire from now (seconds):', timeToExpInSeconds);
    } catch (error) {
      console.log('error', error);
      throw error;
    }

    return token;
  }
}
