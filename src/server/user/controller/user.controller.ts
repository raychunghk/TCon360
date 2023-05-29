import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Prisma, UserInfo } from '@prisma/client';
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: any) {
    console.log(data);
    const result = this.userService.createUser(data);
    return { message: 'Data received and saved to database' };
  }

  @Get()
  async createUser(
    @Body() postData: Prisma.UserInfoCreateInput,
  ): Promise<UserInfo> {
    console.log(postData);
    return this.userService.createUser(postData);
  }
}
