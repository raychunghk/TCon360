import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('publiccalendar')
  async createPublicCalendar(@Body() calendarData: any) {
    // Call the corresponding service method to handle the calendar data
    await this.adminService.createPublicCalendar(calendarData);
    return { message: 'Public calendar created successfully' };
  }
}