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
import { GoogleAuthDto, GoogleSignupDto, signupUserDTO } from '../models/customDTOs.js';
import { AuthService } from './auth.service.js';
import { UsersService } from './users.service.js';

import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  identifier: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  excludeViewStaff?: boolean; // defaults to false/undefined if not sent
}
@Controller('api')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Post('user/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: any; tokenMaxAge: number }> {
    Logger.log(`Login attempt for user: ${loginDto.identifier}`, 'UsersController');
    try {
      const { identifier, password, excludeViewStaff } = loginDto;

      // Pass the optional flag to the service
      const { token, user } = await this.authService.login(
        identifier,
        password,
        { excludeViewStaff: excludeViewStaff ?? false },
      );

      const tokenMaxAge = parseInt(process.env.TOKEN_MAX_AGE || '0', 10) / 1000; // seconds

      Logger.log(`Login successful for user: ${user.email}`, 'UsersController');
      return {
        accessToken: token,
        user,
        tokenMaxAge,
      };
    } catch (error) {
      Logger.error(`Login failed for user: ${loginDto.identifier}`, error.stack, 'UsersController');
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
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
      Logger.error(`Validation error for username: ${data.username}, email: ${data.email}`, error.stack, 'UsersController');
      throw new HttpException(
        'An error occurred during validation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('user/signup')
  async signUp(@Body() user: signupUserDTO) {
    Logger.log(`Signup attempt for email: ${user.email}`, 'UsersController');
    try {
      Logger.debug(`Signup data: ${JSON.stringify(user)}`, 'UsersController');
      const existingUser = await this.authService.userExists(
        user.username,
        user.email,
      );

      // If user exists, check if they have a staff record.
      // If they don't have staff data, we treat this as onboarding (allow signup to proceed)
      if (existingUser) {
        const fullUser = await this.usersService.findUserByIdentifier(user.email);
        if (fullUser && fullUser.staffId) {
          return {
            statusCode: 400,
            message: 'Username or email already exists',
          };
        }
      }
      const newUser = await this.authService.signUp(user);

      // If password is provided, perform regular login.
      // If not (social onboarding), we still need to return an access token.
      let loginResult;
      if (user.password) {
        loginResult = await this.authService.login(
          user.username,
          user.password,
        );
      } else {
        // Social onboarding case - we already trust the user at this point
        // Fetch the user again to make sure we have everything
        const userWithDetails = await this.usersService.getUserWithStaffAndContract(newUser.id);
        // Generate token manually or via a special method
        // For now, let's assume we can use a simplified payload
        const payload = {
          sub: newUser.id,
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
        };
        const token = this.authService.generateToken(payload);
        loginResult = { token, user: userWithDetails };
      }

      return {
        accessToken: loginResult.token,
        user: loginResult.user,
        tokenMaxAge: parseInt(process.env.TOKEN_MAX_AGE || '0', 10) / 1000,
      };
    } catch (error) {
      Logger.error(`Signup error for email: ${user.email}`, error.stack, 'UsersController');

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
    Logger.debug(`Fetched user details for ID: ${userId}`, 'UsersController');
    return user;
  }

  @Post('user/google-signup')
  async handleGoogleSignup(@Body() googleData: GoogleSignupDto) {
    Logger.log('Handling Google signup request...', 'UsersController');
    // Avoid logging the entire googleData object in production if it contains sensitive info.
    // For debugging, you can log specific, non-sensitive fields.
    Logger.debug(`Received data for email: ${googleData.email}`, 'UsersController');
    try {
      const { token, user } = await this.authService.handleGoogleSignup(googleData);

      const tokenMaxAge = parseInt(process.env.TOKEN_MAX_AGE || '0', 10) / 1000; // seconds

      Logger.log(`Google signup successful for user: ${user.email}`, 'UsersController');
      return {
        accessToken: token,
        user,
        tokenMaxAge,
      };
    } catch (error) {
      Logger.error(`Google signup failed for email: ${googleData.email}`, error.stack, 'UsersController');
      throw new HttpException('Google signup failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('user/google-callback')
  async handleGoogleAuth(@Body() googleData: GoogleAuthDto) {
    Logger.log(`Handling Google auth request for email: ${googleData.email}`, 'UsersController');
    try {
      const { token, user } = await this.authService.handleGoogleAuth(googleData);

      const tokenMaxAge = parseInt(process.env.TOKEN_MAX_AGE || '0', 10) / 1000; // seconds

      Logger.log(`Google auth successful for user: ${user.email}`, 'UsersController');
      return {
        accessToken: token,
        user,
        tokenMaxAge,
      };
    } catch (error) {
      Logger.error(`Google auth failed for email: ${googleData.email}`, error.stack, 'UsersController');
      throw new HttpException('Google authentication failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
