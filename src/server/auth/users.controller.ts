import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

interface LoginDto {
  identifier: string;
  password: string;
}
@Controller('api')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  //@HttpCode(200)
  //@UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    console.log('login controller');
    console.log(loginDto);
    const { identifier, password } = loginDto;
    const accessToken = await this.authService.login(identifier, password);
    console.log('accessToken');
    console.log(accessToken);
    return { accessToken };
  }
  @Post('user/validateuser')
  //async signUp(@Request() req) {
  async validateUser(@Body() data: { username: string; email: string }) {
    const { username, email } = data;
    const existingUser = await this.authService.userExists(username, email);
    if (existingUser) {
      // Username or email already exists, return an error response
      return {
        message: 'Username or email already exists',
      };
    } else {
      return {
        message: 'ok',
      };
    }
  }
  @Post('user/signup')
  //async signUp(@Request() req) {
  async signUp(@Body() user: Prisma.UserCreateInput) {
    //const user = req.body;

    try {
      console.log('signup here');
      console.log(user);
      //  const usercreate =   Prisma.UserCreateInput
      const existingUser = await this.authService.userExists(
        user.username,
        user.email,
      );
      if (existingUser) {
        // Username or email already exists, return an error response
        return {
          statusCode: 400,
          message: 'Username or email already exists',
        };
      }
      const newUser = await this.authService.signUp(user);
      const accessToken = await this.authService.login(
        user.username,
        user.password,
      );
      return { accessToken };
    } catch (error) {
      console.log(error);
      throw error;
    }
    // Handle sign-up logic here
  }

  @Get('user/myuser')
  @UseGuards(AuthGuard('jwt'))
  async getMyUser(@Req() req) {
    const userId = req.user.id;
    const user = await this.usersService.getUserWithStaffAndContract(userId);
    console.log(user);
    return user;
  }
}
