import { Injectable } from '@nestjs/common';
import { viewCalendarTimeSheet, viewEvents } from '@prisma/client';
import { spawn } from 'child_process';
import { format } from 'date-fns';
import fs, { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { PrismaService } from '../prisma/prisma.service.js';

import ExcelJS from 'exceljs';
@Injectable()
export class TimesheetService {
  private projectRoot = process.cwd();
  private readonly xlsfilename = 'T26TimeSheet.xlsx';
  constructor(private prisma: PrismaService) {}

  getContent() {
    const filePath = this.getFilePath(this.xlsfilename);
    const fileContent = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileContent);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }

  getFilePath(filename: string) {
    return path.join(this.projectRoot, 'timesheet', filename);
  }

  async getCalendarEvents(staffid): Promise<any[]> {
    const results = await this.prisma.viewEvents.findMany({
      where: {
        OR: [
          { eventType: { in: ['weekend', 'publicholiday'] } },
          { staffId: staffid },
        ],
      },
      select: {
        ID: true,
        leavePeriodStart: true,
        leavePeriodEnd: true,
        HolidaySummary: true,
        LeaveRequestId: true,
        eventType: true,
        leaveDays: true,
        Year: true,
        Month: true,
      },
    });
    return results.map((result: viewEvents) => {
      const title = result.HolidaySummary
        ? result.HolidaySummary
        : result.LeaveRequestId
          ? `Vacation ${result.LeaveRequestId}`
          : null;
      const _start = result.leavePeriodStart.toISOString().substring(0, 10);
      const _end = result.leavePeriodEnd;
      const enddatestr = _end
        ? new Date(_end.getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .substring(0, 10)
        : '';
      const _groupid = result.LeaveRequestId || '';

      const mapEventStyle = new Map();
      mapEventStyle.set('weekend', 'clsweekend');
      mapEventStyle.set('publicholiday', 'clsPublicHoliday');
      mapEventStyle.set('vacation', 'clsVacation');
      mapEventStyle.set('sick', 'clsVacation');
      const _color = result.LeaveRequestId ? '#3940fa' : '';
      return {
        id: result.ID,
        title,
        start: _start,
        end: enddatestr,
        display:
          result.eventType == 'weekend' || result.eventType == 'publicholiday'
            ? 'background'
            : '',
        classNames: [mapEventStyle.get(result.eventType)],
        groupId: _groupid,
        extendedProps: { result },
      };
    });
  }

  async writeStaffInfoJsonToExcel(
    jsonObj: any,
    fieldmap: Record<string, string>,
    destPath: string,
  ) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(destPath);
    const worksheet = workbook.getWorksheet(1);
    for (const field of Object.keys(fieldmap)) {
      const cell = worksheet.getCell(fieldmap[field]);
      cell.value = jsonObj[field];
    }
    await workbook.xlsx.writeFile(destPath);
    console.log('Data written to Excel file successfully!');
    return destPath;
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}${mm}${dd}`;
  }

  async copyAndRenameFile(
    srcFileName: string,
    destFileName: string,
  ): Promise<void> {
    await fsPromises.copyFile(srcFileName, destFileName);
  }

  writeCellValue(worksheet, cellId, value) {
    const cell = worksheet.getCell(cellId);
    cell.value = value;
  }

  formatMonth(month, year) {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    const monthName = months[month - 1];
    return `${monthName}${year}`;
  }

  async getCalendar(staffId: number, year: number, month: number) {
    const viewCalendarTimeSheet = (await this.prisma.$queryRawUnsafe(`
SELECT c.CalendarDate,
       STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(c.CalendarDate / 1000, 'unixepoch')) AS CalendarDateStr,
       c.WeekDayName,
       c.Year,
       c.Month,
       CAST(IFNULL(vc.VacationChargable, 0.0) AS REAL) AS VacationChargable,
       IFNULL(vc.PublicHolidayChargable, 0.0) AS PublicHolidayChargable,
       vc.HolidaySummary,
       vc.LeaveRequestId,
       vc.StaffId,
       IFNULL(vc.ContractId, 0) AS ContractId
FROM CalendarMaster c
LEFT JOIN (
    SELECT ID,
           CalendarDate,
           VacationChargable,
           PublicHolidayChargable,
           HolidaySummary,
           LeaveRequestId,
           StaffId,
           ContractId
    FROM viewCalendarTimeSheet
    WHERE Year = ${year}
      AND Month = ${month}
      AND (IFNULL(StaffId, ${staffId}) = ${staffId})
) vc ON vc.CalendarDate = c.CalendarDate
WHERE Year = ${year}
  AND Month = ${month}
ORDER BY c.CalendarDate;
`)) as viewCalendarTimeSheet[];
    console.log('viewCalendarTimeSheet', viewCalendarTimeSheet);
    return viewCalendarTimeSheet;
  }

  async getCalendarx(staffId: number, year: number, month: number) {
    const arrCalendar = await this.prisma.viewCalendarTimeSheet.findMany({
      distinct: ['CalendarDate'],
      where: {
        Year: year,
        Month: month,
        OR: [{ staffId: staffId }, { staffId: null }],
      },
      orderBy: [
        {
          CalendarDate: 'asc',
        },
      ],
      select: {
        CalendarDate: true,
        CalendarDateStr: true,
        WeekDayName: true,
        Year: true,
        Month: true,
        VacationChargable: true,
        PublicHolidayChargable: true,
        HolidaySummary: false,
        staffId: true,
      },
    });
    console.log('arrcalendar', arrCalendar);
    return arrCalendar;
  }

  async makeTimeSheet(
    staffId: number,
    year: number,
    month: number,
  ): Promise<number> {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');
    const timesheetFileDate = this.formatMonth(month, year);
    const sourcePath = this.getFilePath(this.xlsfilename);
    const stf = await this.prisma.staff.findUnique({ where: { id: staffId } });
    if (!stf) {
      throw new Error(`Staff with ID ${staffId} not found`);
    }
    const stfname = stf.StaffName.replace(/[_\s]/g, '');
    const destPath = this.getFilePath(
      `T26TimeSheet_${stfname}_${timesheetFileDate}.xlsx`,
    );
    const destPDF = this.getFilePath(`T26TimeSheet_${formattedDate}.pdf`);

    console.log(destPath);
    if (fs.existsSync(destPath)) {
      console.log('TimeSheet: Destination file already exists!');
      fs.unlinkSync(destPath);
    }

    try {
      console.log(`source path, ${sourcePath}`);
      console.log(`dest source path, ${destPath}`);
      await fsPromises.copyFile(sourcePath, destPath);
      console.log('File copied successfully!');

      console.log(stf);
      const fieldmap = {
        StaffName: 'D5',
        AgentName: 'D6',
        StaffCategory: 'D7',
        Department: 'D8',
        PostUnit: 'L8',
        ManagerName: 'K12',
        ManagerTitle: 'E13',
        ManagerEmail: 'K13',
      };
      await this.writeStaffInfoJsonToExcel(stf, fieldmap, destPath);
      const objCalendar = await this.getCalendar(staffId, year, month);
      const firstdatecell = 20;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(destPath);
      const worksheet = workbook.getWorksheet(1);
      let datecellpos = firstdatecell;
      let cellid = '';
      const emptydateRowID = ['A', 'C', 'E', 'H', 'J', 'L', 'N'];
      const celltimesheetstart = 'D9';
      const celltimesheetend = 'L9';

      this.writeCellValue(
        worksheet,
        celltimesheetstart,
        format(objCalendar[0].CalendarDate, 'dd-MMM-yyyy'),
      );

      this.writeCellValue(
        worksheet,
        celltimesheetend,
        format(objCalendar.slice(-1)[0].CalendarDate, 'dd-MMM-yyyy'),
      );
      let total = 0;
      for (let i = 0; i < 31; i++) {
        cellid = 'C' + datecellpos;
        const cell = worksheet.getCell(cellid);

        try {
          if (i < objCalendar.length) {
            const dt = objCalendar[i];
            console.log('calendar item??');
            console.log(dt);
            const holidayCell = worksheet.getCell('L' + datecellpos);
            const vacationLeaveCell = worksheet.getCell('J' + datecellpos);
            let isHoliday = 0;
            const one = 1;
            const zero = 0;
            console.log(
              'type of dt.PublicHolidayChargable',
              typeof dt.PublicHolidayChargable,
            );
            if (Number(dt.PublicHolidayChargable) > 0) {
              cell.value = zero;
              holidayCell.value = one;
              isHoliday = 1;
            }
            if (Number(dt.VacationChargable) > 0 && isHoliday === 0) {
              const cellval = Number(1 - Number(dt.VacationChargable));
              cell.value = cellval;
              vacationLeaveCell.value = Number(dt.VacationChargable);
              if (cellval > 0) {
                total += cellval;
              }
              isHoliday = 1;
            }
            if (isHoliday === 0) {
              cell.value = one;
              total += 1;
              holidayCell.value = zero;
            }
          } else {
            emptydateRowID.forEach((x) => {
              const _hcellid = x + datecellpos;
              console.log(`last row post ${_hcellid}`);
              const _cell = worksheet.getCell(_hcellid);
              _cell.value = '';
            });
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
        datecellpos++;
      }
      const totalcell = worksheet.getCell('C51');
      totalcell.value = total;

      worksheet.name = `Timesheet_${timesheetFileDate}`;
      await workbook.xlsx.writeFile(destPath);
      console.log('calendar written to cell successfully!', destPath);
      const _file = await this.prisma.staffFiles.create({
        data: {
          filePath: destPath,
          fileType: 'timesheet',
          staff: { connect: { id: staffId } },
        },
      });
      return _file.id;
    } catch (err) {
      console.error('Error processing file:', err);
      throw err;
    }
  }

  async convertToPdf(inputFile, outputFile): Promise<void> {
    const child = spawn('unoconv', ['-f', 'pdf', '-o', outputFile, inputFile]);
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    await new Promise<void>((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`unoconv exited with code ${code}`));
        }
      });
    });
  }

  async getCalendaryMonthByYearMonth(month, year) {
    const currentcalendar = await this.prisma.calendarMaster.findMany({
      where: {
        Year: year,
        Month: month,
      },
    });
    return currentcalendar;
  }

  async getCurrentMonthCalendar(tsmonth) {
    const dt = new Date();
    const currentYear = dt.getFullYear();
    const objCalendar = await this.prisma.calendarMaster.findMany({
      where: {
        Year: currentYear,
        Month: tsmonth,
      },
    });
    console.log('calendar returning?');
    console.log(objCalendar);
    return objCalendar;
  }
}
