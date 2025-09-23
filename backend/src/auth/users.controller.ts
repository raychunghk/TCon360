import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { signupUserDTO } from '../models/customDTOs.js';
import { AuthService } from './auth.service.js';
import { UsersService } from './users.service.js';

interface LoginDto {
  identifier: string;
  password: string;
}
@Controller('api')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  //@HttpCode(200)
  //@UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; tokenMaxAge: Number }> {
    try {
      const { identifier, password } = loginDto;
      const accessToken = await this.authService.login(identifier, password);
      const tokenMaxAge = parseInt(process.env.TOKEN_MAX_AGE) / 60;
      console.log(`In login , token max age`, tokenMaxAge);
      return { accessToken, tokenMaxAge };
    } catch (error) {
      Logger.error('Login error', error);
      throw new HttpException(
        'Login failed',
        HttpStatus.UNAUTHORIZED, // More specific error code
      );
    }
  }

  @Post('user/validateuser')
  async validateUser(@Body() data: { username: string; email: string }) {
    try {
      const { username, email } = data;
      const existingUser = await this.authService.userExists(username, email);
      if (existingUser) {
        return { message: 'Username or email already exists' };
      } else {
        return { message: 'ok' };
      }
    } catch (error) {
      Logger.error('Validation error', error);
      throw new HttpException(
        'An error occurred during validation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('user/signup')
  //async signUp(@Request() req) {
  async signUp(@Body() user: signupUserDTO) {
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
      Logger.error('Signup error', error);
      console.log(error);

      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }

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
