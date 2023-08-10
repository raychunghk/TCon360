import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from "jsonwebtoken";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && bcrypt.compareSync(password, user.password)) {
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
    console.log(user)
    let userReturn;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const userReturn = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        }
      });

    } catch (error) {
      console.log(error)
    }
    return userReturn;
    //return this.usersService.createUser(user);
  }

  async login(identifier: string, password: string) {
    const user = await this.prisma.user.findFirst({
      include: {
        staff: true,
      },
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };
    const options = {
      expiresIn: '15m', // token expires in 1 minute
    };
    const token = this.jwtService.sign(payload, options);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Print the decoded token
    console.log(decoded);

    // Access the payload

    return token;
  }



}