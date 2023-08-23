import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwtpayload.interface';
import { StaffService } from '../staff/service/staff.service';

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

  async signUp(user: Prisma.UserCreateInput): Promise<User> {
    console.log('user', user);
    let userReturn;
    const { staff, ...userData } = user;
    const stf: any = { ...staff };
    console.log('staff?');
    console.log(stf);
    const hashedPassword = await argon2.hash(userData.password, {
      type: argon2.argon2id,
    });
    //user: { connect: { id: _userId } }
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
        },
      });
      const _userId = createdUser.id;
      const rtn = await this.prisma.staff.create({
        data: {
          ...stf,
          user: { connect: { id: _userId } },
        },
      });
      const stfid = rtn.id;
      await this.prisma.user.update({
        where: { id: _userId },
        data: { staffId: stfid },
      });
      const _user = await this.prisma.user.findFirst({
        include: {
          staff: true,
        },
        where: {
          OR: [{ username: userData.username }],
        },
      });
      return _user;
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
      console.log(tokenage);
      const options = {
        expiresIn: `${tokenage}m`, // token expires in 1 minute
      };
      console.log('jwt options');
      console.log(options);
      token = this.jwtService.sign(payload, options);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Print the decoded token
      console.log('just signed in decoded token in nest.js');
      console.log(decoded);
      console.log('now?');
      console.log(new Date());

      const iat = new Date(decoded['iat'] * 1000);

      console.log('Token iat  on:', iat);
      const expDate = new Date(decoded['exp'] * 1000);

      console.log('Token expires on:', expDate);
      // Access the payload
    } catch (error) {
      console.log('error', error);
      throw error;
    }

    return token;
  }
}
