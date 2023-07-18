import { Body, Controller, Get, Res, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { TimesheetService } from './timesheet.service';

@Controller('api/timesheet')
export class TimesheetController {
  constructor(private readonly tsService: TimesheetService) { }
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

  @Get('calendar')
  async getCalendarEvents(@Body() data: { year: number, month: number }): Promise<any[]> {
    return this.tsService.getCalendarEvents(data.year, data.month);
  }
}
