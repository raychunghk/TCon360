import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as ExcelJS from 'exceljs';
import { PrismaService } from '../../../prisma.service';
import { Staff, Prisma } from '@prisma/client';
//import * as XlsxPopulate from 'xlsx-populate';

@Injectable()
export class TimesheetService {
    private readonly xlsfilename = 'T26TimeSheet.xlsx';

    constructor(private prisma: PrismaService) { }

    getContent() {
        const filePath = this.getFilePath(this.xlsfilename);
        const fileContent = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileContent);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(sheet);
    }

    getFilePath(filename: string) {
        return `${__dirname}/../../../../timesheet/${filename}`;
    }

    async writeJsonToExcel(jsonObj: any, fieldmap: Record<string, string>, destPath: string) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(destPath);
        const worksheet = workbook.getWorksheet(1);

        // Write the values to the worksheet
        for (const field of Object.keys(fieldmap)) {
            const cell = worksheet.getCell(fieldmap[field]);
            cell.value = jsonObj[field];
        }

        // Save the workbook to the destination path
        await workbook.xlsx.writeFile(destPath);




        console.log('Data written to Excel file successfully!');
        return destPath;
    }

    async copyFileAndWriteToCell(tsmonth: number) {
        const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const sourcePath = this.getFilePath(this.xlsfilename);
        const destPath = this.getFilePath(`T26TimeSheet_${formattedDate}.xlsx`);
        console.log(destPath);

        if (fs.existsSync(destPath)) {
            console.log('Destination file already exists!');
            fs.unlinkSync(destPath);
        }

        try {
            // Copy the file
            const data = await fs.promises.readFile(sourcePath);
            await fs.promises.writeFile(destPath, data);
            console.log('File copied successfully!');

            // Load the workbook
            const stf = await this.prisma.staff.findUnique({ where: { id: 4 } });
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

            await this.writeJsonToExcel(stf, fieldmap, destPath);
            console.log('Data written to cell D5 successfully!');
            return destPath;
        } catch (err) {
            console.error('Error copying file:', err);
            return false;
        }
    }




    async getCalendaryMonthByYearMonth(month, year) {
        const currentcalendar = await this.prisma.calendarMaster.findMany({
            where: {
                Year: 2023
                , Month: month
            }
        });

        return currentcalendar;
    }
    async getCurrentMonthCalendar(tsmonth) {
 
        const dt = new Date();
        console.log(dt.getFullYear())
        console.log(dt.getMonth() + 1);
        const currentYear = dt.getFullYear();
        const objCalendar = await this.prisma.calendarMaster.findMany({
            where: {
                Year: 2023
                , Month: tsmonth
            }
        });
        console.log('calendar returning?')
        console.log(objCalendar);
        return objCalendar;
    }




}