import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
