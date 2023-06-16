import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {Prisma, User} from '@prisma/client';
@Controller("api")
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

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