import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from 'src/models/customDTOs';
import { AuthGuard } from '@nestjs/passport';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { join } from 'path';
import { stringify } from 'querystring';
import { Readable } from 'stream';
import type { Response } from 'express';
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
  @Get('userbackup')
  @UseGuards(AuthGuard('jwt'))
  async userBackup(@Req() req, @Res() res: Response) {
    try {
      const userId = req.user.id;
      console.log('user id:', userId);
      const userData = await this.adminService.userBackup(userId);
      const jsonStringData = stringify(userData);

      // Create a temporary file path (you might want to handle this more robustly)
      const tempFilePath = join(process.cwd(), 'temp-backup.json');

      // Create a write stream to write the JSON string to the file
      const writeStream = createWriteStream(tempFilePath);

      // Write to the file and handle errors
      writeStream.write(jsonStringData, (err) => {
        if (err) {
          console.error('Error writing JSON to file:', err);
          throw new HttpException(
            'Failed to create backup file',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          // Create a read stream from the temporary file
          const fileStream = createReadStream(tempFilePath);

          // Set headers for file download
          res.setHeader('Content-Type', 'application/json');
          res.setHeader(
            'Content-Disposition',
            'attachment; filename=backup.json',
          );

          // Pipe the read stream to the response
          fileStream.pipe(res);

          // Optionally delete the temporary file after sending
          fileStream.on('close', () => {
            unlink(tempFilePath, (err) => {
              if (err) {
                console.error('Error deleting temporary file:', err);
                // Handle the error (maybe log it) but don't throw
              }
            });
          });
        }
      });
      //   const jsonStringData = JSON.stringify(userData);
      // console.log('json string data', jsonStringData);

      /*
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="backup.json"',
      });
*/
      /*
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${downloadFileName}`,
      );
      const _file = createReadStream(stfFilePath);
      _file.pipe(res);*/
      //console.log('backup data?', userData);
      //return userData;
    } catch (error) {
      console.error('Failed to backup:', error);
      throw new HttpException(
        'Failed to backup' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
