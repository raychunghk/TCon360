import { Controller, Get, Res } from '@nestjs/common';
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
  async createTS(@Res() res) {
    const result = await this.tsService.copyFile();
    const json = {success:true};
    return res.send(json);
  }
}
