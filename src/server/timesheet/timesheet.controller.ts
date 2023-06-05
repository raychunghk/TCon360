import { Controller, Get, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';

@Controller('api/timesheet')
export class TimesheetController {
  @Get('content')
  async getContent(@Res() res) {
    const filePath = `${__dirname}/../../../timesheet/T26TimeSheet.xls`;
    const fileContent = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileContent);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(sheet);
    return res.send(json);
  }
}
