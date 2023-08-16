<<<<<<< HEAD
import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
=======
import { Body, Controller, Get, Res, Post, UseGuards, Req } from '@nestjs/common';
>>>>>>> 4116ed6705f22ad9d75275141662c63a37ed1e8b
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { TimesheetService } from './timesheet.service';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service';
<<<<<<< HEAD
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../auth/users.service';
import type { AuthReqInterface } from '../AuthReqInterface';
import { setDefaultResultOrder } from 'dns';
@Controller('api/timesheet')
export class TimesheetController {
  constructor(
    private readonly tsService: TimesheetService,
    private readonly leaveRequestSvc: LeaveRequestService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }
=======
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../auth/users.service';

@Controller('api/timesheet')
export class TimesheetController {
  constructor(private readonly tsService: TimesheetService,
    private readonly usrSvc: UsersService,
    private readonly leaveRequestSvc: LeaveRequestService) { }
>>>>>>> 4116ed6705f22ad9d75275141662c63a37ed1e8b
  @Get('content')
  async getContent(@Res() res) {
    const json = await this.tsService.getContent();
    return res.send(json);
  }

  @Post('create')
  async postFunction(@Body() data: { year: number; month: number }) {
    console.log(
      'server accepted param data:' + data.month + ',year:' + data.year,
    );
    const _fileid = await this.tsService.makeTimeSheet(
      1,
      data.year,
      data.month,
    );

    return {
      fileid: _fileid,
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
<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
  async getCalendarEvents(
    @Headers('Authorization') auth: string,
    @Req() req,
  ): Promise<any[]> {
    console.log('user?');
    const user = req.user;
    console.log('user?');
    console.log(user);
    console.log(auth);
    //console.log(req)
    const token = auth.split(' ')[1];
    try {
      const decodedtoken = this.authService.decodejwt(token);
      const userId = decodedtoken.sub;
      // Find the user with the given userId
      const user = await this.userService.findById(userId);

      const result = await this.tsService.getCalendarEvents(user.staffId);
      console.log('calendar event result');
      //const result = this.staffService.createStaff(stf, userId).then();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
=======
  async getCalendarEvents(@Req() req, @Body() data: {}): Promise<any[]> {
    const userId = req.user.id;
    const user = await this.usrSvc.getUserWithStaff(userId);
    const staffId = user.staffId;
    return this.tsService.getCalendarEvents(staffId);
>>>>>>> 4116ed6705f22ad9d75275141662c63a37ed1e8b
  }
}
