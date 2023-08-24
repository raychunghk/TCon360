import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from '../../customDto/customDTOs';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  async getAllUsers() {
    try {
      const users = await this.adminService.getAllUsers();
      const roles = await this.adminService.getAllRoles();
      return { users, roles };
    } catch (error) {
      console.error('Failed to get users and roles:', error);
      throw new Error('Failed to get users and roles');
    }
  }
  @Get('roles')
  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.adminService.getAllRoles();
      return roles;
    } catch (error) {
      console.error('Failed to get roles:', error);
      throw new Error('Failed to get roles');
    }
  }
  @Put('updateuser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.adminService.updateUser(id, updateUserDto);
      return user;
    } catch (error) {
      console.log('error', error);
      // Handle the error appropriately (e.g., log, return custom response)
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('publicholiday')
  async createPublicHoliday(@Body() data: { icsUrl: string }) {
    const { icsUrl } = data;
    const icsfielurltype = typeof icsUrl;
    console.log('icsfielurltype', icsfielurltype);
    // Call the corresponding service method to handle the calendar data
    await this.adminService.createPublicHoliday(icsUrl);
    return { message: 'Calendar Database updated successfully' };
  }
}
