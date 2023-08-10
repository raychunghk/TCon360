import { Body, Controller, Get, Res, Post, UseGuards, Req } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { TimesheetService } from './timesheet.service';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../auth/users.service';

@Controller('api/timesheet')
export class TimesheetController {
  constructor(private readonly tsService: TimesheetService,
    private readonly usrSvc: UsersService,
    private readonly leaveRequestSvc: LeaveRequestService) { }
  @Get('content')
  async getContent(@Res() res) {

    const json = await this.tsService.getContent();
    return res.send(json);
  }

  @Post('create')
  async postFunction(@Body() data: { year: number, month: number }) {
    console.log("server accepted param data:" + data.month + ",year:" + data.year);
    const _fileid = await this.tsService.makeTimeSheet(1, data.year, data.month);

    return {
      fileid: _fileid
    };
  }
  @Get('publicholidays')
  async getpublicholidays(): Promise<any[]> {
    return this.leaveRequestSvc.findAllPublicHoliday();
  }
  // @Get('calendar')
  // async getCalendarEvents(@Body() data: { year: number, month: number }): Promise<any[]> {
  //   return this.tsService.getCalendarEvents(data.year, data.month);
  // }
  @UseGuards(AuthGuard('jwt'))
  @Get('calendar')
  async getCalendarEvents(@Req() req, @Body() data: {}): Promise<any[]> {
    const userId = req.user.id;
    const user = await this.usrSvc.getUserWithStaff(userId);
    const staffId = user.staffId;
    return this.tsService.getCalendarEvents(staffId);
  }
}
