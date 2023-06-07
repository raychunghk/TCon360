import { Body, Controller, Get, Res, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { TimesheetService } from './service/timesheet.service';

@Controller('api/timesheet')
export class TimesheetController {
  constructor(private readonly tsService: TimesheetService) { }
  @Get('content')
  async getContent(@Res() res) {

    const json = await this.tsService.getContent();
    return res.send(json);
  }
  @Get('create')
  async createTS_old(@Res() res) {
    const result = await this.tsService.copyFileAndWriteToCell();
    const json = { success: true };
    return res.send(json);
  }

  

  @Post('create')
  async postFunction(@Body('tsmonth') tsmonth: number) {
    const result = await this.tsService.copyFileAndWriteToCell(tsmonth);
    return {
      result: 'success'
    };
  }
}
