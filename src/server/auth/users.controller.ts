import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {Prisma, User} from '@prisma/client';
interface LoginDto {
  identifier: string;
  password: string;
}
@Controller("api")
export class UsersController {
  constructor(private authService: AuthService) {}

  //@HttpCode(200)
  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    console.log("login controller")
    console.log(loginDto);
    const { identifier, password } = loginDto;
    const accessToken = await this.authService.login(identifier, password);
    return { accessToken };
  }
  // async login(@Request() req) {
  //   console.log('login accepted');
  //   const objuser = req.user;
  //   console.log(objuser)
  //   return this.authService.login(objuser);
  // }

  @Post('auth/signup')
  //async signUp(@Request() req) {
  async signUp(@Body()user : Prisma.UserCreateInput) {
    //const user = req.body;
    let rtn;
    try {
      console.log('signup here');
      console.log(user)
    //  const usercreate =   Prisma.UserCreateInput
       rtn = this.authService.signUp (user);
    } catch (error) {
      console.log(error)
    }
    return rtn;
    // Handle sign-up logic here
  }


}