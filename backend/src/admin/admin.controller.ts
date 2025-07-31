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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role, User } from '@prisma/client';
import type { Response } from 'express';
import fs, { createReadStream, unlink } from 'fs';
import * as path from 'path';
import { join } from 'path';
import { UpdateUserDto } from '../models/customDTOs.js';
import { AdminService } from './admin.service.js';

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
      throw new HttpException(
        'Failed to get users and roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('userrestore')
  @UseInterceptors(FileInterceptor('jsonFile'))
  async userRestore(
    @UploadedFile() jsonFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!jsonFile) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads');
    const tempFilePath = path.join(uploadsDir, jsonFile.originalname);

    try {
      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      // Save uploaded file to disk
      fs.writeFileSync(tempFilePath, jsonFile.buffer);

      // Read the JSON file
      const jsonData = fs.readFileSync(tempFilePath, 'utf-8');
      console.log('JSON data:', jsonData); // Debugging line
      const restoreData = JSON.parse(jsonData);

      // Access the staff array from the backupData object
      const staffData = restoreData.backupData.staff;

      // Check if the expected structure is present
      if (Array.isArray(staffData)) {
        // Process the restoration logic
        await this.adminService.restoreUserData(staffData);
      } else {
        console.error('Expected "staff" to be an array in the backup data.');
      }
      return res
        .status(200)
        .json({ message: 'User data restored successfully.' });
    } catch (error) {
      console.error('Error restoring user data:', error);
      return res.status(500).json({
        message: 'Failed to restore user data.',
        error: error.message,
      });
    } finally {
      // Clean up the uploaded file
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up temporary file:', cleanupError);
      }
    }
  }

  @Get('userbackup')
  @UseGuards(AuthGuard('jwt'))
  async userBackup(@Req() req, @Res() res: Response) {
    try {
      const userId = req.user.id;
      console.log('user id:', userId);

      // Fetch and stringify the user data
      const userData = await this.adminService.userBackup(userId);
      const jsonStringData = JSON.stringify(userData, null, 2);

      // Create a temporary file path
      const tempFilePath = join(process.cwd(), 'temp-backup.json');

      // Write the JSON string to the file
      fs.writeFileSync(tempFilePath, jsonStringData);

      // Format the current date and time
      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace(/[-T:.Z]/g, '')
        .slice(0, 14);
      const fileName = `tcon360_backup_${formattedDate}.json`;

      // Set headers for file download
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

      // Create a read stream from the temporary file
      const fileStream = createReadStream(tempFilePath);
      fileStream.pipe(res);

      // Optionally delete the temporary file after sending
      fileStream.on('close', () => {
        unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    } catch (error) {
      console.error('Failed to backup:', error);
      throw new HttpException(
        'Failed to backup: ' + error.message,
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
      throw new HttpException(
        'Failed to get roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      console.log('Error updating user:', error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('publicholiday')
  async createPublicHoliday(@Body() data: { icsUrl: string }) {
    const { icsUrl } = data;
    console.log('icsUrl type:', typeof icsUrl);

    // Call the corresponding service method to handle the calendar data
    await this.adminService.createPublicHoliday(icsUrl);
    return { message: 'Calendar Database updated successfully' };
  }
}
