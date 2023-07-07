import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwtpayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly prisma: PrismaService,
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
    console.log(user);
    let userReturn;
    const hashedPassword = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });
    try {
      const userReturn = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return userReturn;
  }

  async login(identifier: string, password: string) {
    const user = await this.prisma.user.findFirst({
      include: {
        staff: true,
      },
      where: {
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
    };
    const tokenage = parseInt(process.env.TOKEN_MAX_AGE) / 60;
    console.log(tokenage);
    const options = {
      expiresIn: `${tokenage}m`, // token expires in 1 minute
    };
    console.log('jwt options');
    console.log(options);
    const token = this.jwtService.sign(payload, options);

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

    return token;
  }
}
