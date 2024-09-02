import { Injectable, Logger, Inject } from '@nestjs/common';

import { LeaveRequest, Prisma, PublicHoliday } from '@prisma/client';
import * as fs from 'fs-extra';
import * as path from 'path';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { format } from 'date-fns';
//import { staffFiles } from 'src/models/staffFiles';

import { file } from 'jszip';
import { StaffFilesService } from '../../shared/staffFiles.service';
import { StaffService } from '../../staff/service/staff.service';
import { PrismaService } from '../../prisma/prisma.service';
//js/NxTime/src/server/leaverequest/service/leaverequest.service.ts

@Injectable()
export class LeaveRequestService {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    private staffservice: StaffService,
    private staffFileservice: StaffFilesService,
  ) {}
  async useStaffService(id: Number) {
    try {
      const staff = await this.staffservice.getStaffById(1);
      return staff;
    } catch (error) {
      console.log(error);
    }
  }
  async createLeaveRequestforgql(leaveRequestData) {
    const createdLeaveRequest = await this.prisma.leaveRequest.create({
      data: leaveRequestData,
    });
    return createdLeaveRequest;
  }
  // getFilePath(filename: string) {
  //   return path.resolve(`${__dirname}/../../../../timesheet/${filename}`);
  // }
  getFilePath(fileName: string): string {
    // return path.join(__dirname, '../../timesheet', fileName);
    const isDevelopment = process.env.NODE_ENV === 'development';
    /*const rootPath = isDevelopment
      ? path.resolve('.')
      : path.resolve(__dirname, '..', '..', '..', '..');*/
    const rootPath = isDevelopment
      ? path.resolve('.')
      : path.resolve(__dirname, '..', '..', '..');
    const filePath = path.join(rootPath, 'timesheet', fileName);
    console.log('get file path file name', filePath);
    return filePath;
  }
  private formatdate(_date): string {
    if (_date) return format(new Date(_date), 'dd/MM/yyyy');
  }
  public getDateArray(start, end) {
    const dateArray = [];
    const currentDate = new Date(start);
    if (!end) dateArray.push(new Date(currentDate));
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  async validateCreateLeaveRequest(
    staffId: number,
    contractId: number,
    data: Prisma.LeaveRequestCreateInput,
  ) {
    const dateArr = this.getDateArray(
      data.leavePeriodStart,
      data.leavePeriodEnd,
    );
    console.log('dateArr?', data);

    const vacationDates = await this.prisma.calendarVacation.findMany({
      where: {
        leaveRequest: {
          staffId: staffId,
          contractId: contractId,
        },
      },
      select: {
        VacationDate: true,
      },
    });

    // Check if any of the dates in the leave request overlap with existing vacation dates
    const overlappingDates = dateArr.filter((date) => {
      return vacationDates.some((vacationDate) => {
        return date.getTime() === vacationDate.VacationDate.getTime();
      });
    });

    // If there are any overlapping dates, throw an error
    if (overlappingDates.length > 0) {
      throw new Error(
        `The following dates overlap with existing vacation dates: ${overlappingDates.map(
          (date) => date.toLocaleDateString(),
        )}`,
      );
    }
  }
  async createword(
    staffId: number,
    contractId: number,
    data: Prisma.LeaveRequestCreateInput,
  ) {
    const date = new Date(Date.now());
    const formattedDate = date
      .toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/[^\d]/g, '');
    const sourcePath = this.getFilePath('LeaveAppForm.docx');
    const destPath = this.getFilePath(`LeaveAppForm_${formattedDate}.docx`);
    const destPDF = this.getFilePath(`LeaveAppForm_${formattedDate}.pdf`);

    console.log(destPath);
    if (fs.existsSync(destPath)) {
      console.log('Leave Application:Destination file already exists!');
      fs.unlinkSync(destPath);
    }

    try {
      // Copy the file
      console.log(`source path, ${sourcePath}`);
      console.log(`dest source path, ${destPath}`);
      const data = await fs.promises.readFile(sourcePath);
      await fs.promises.writeFile(destPath, data);
      console.log('File copied successfully!');
    } catch (err) {
      console.error('Error copying file:', err);
      throw err;
    }

    //render field values.
    try {
      console.log('destpath?' + destPath);
      const templatePath = destPath; //path.resolve(__dirname, '../../../leaveForm.docx');
      const content = fs.readFileSync(templatePath, 'binary');
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      const staff = await this.staffservice.getStaffById(1);
      Logger.debug('before format date, leave start');
      Logger.debug(data.leavePeriodStart);
      const leaveperiodstart = this.formatdate(data.leavePeriodStart);
      Logger.debug('After format date, leave start');
      Logger.debug(leaveperiodstart);

      const leaveperiodend = this.formatdate(data.leavePeriodEnd);

      let _leaveperiod = `${leaveperiodstart} ${
        data.AMPMStart == 'AMPM' ? '' : data.AMPMStart
      } `;
      _leaveperiod = leaveperiodend
        ? `${_leaveperiod} to  ${leaveperiodend} ${
            data.AMPMEnd == 'AMPM' ? '' : data.AMPMEnd
          }`
        : `${_leaveperiod}`;

      doc.render({
        staffname: staff.StaffName,
        staffcategory: staff.StaffCategory,
        agentname: staff.AgentName,
        leaveperiod: _leaveperiod,
        leavedays: `${data.leaveDays} Day(s)`,
        dateofreturn: this.formatdate(data.dateOfReturn),
        staffsigndate: this.formatdate(data.staffSignDate),
      });
      const buffer = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(destPath, buffer);

      const _file = await this.prisma.staffFiles.create({
        data: {
          filePath: destPath,
          fileType: 'leaverequstform',
          staff: { connect: { id: staffId } },
        },
      });

      let lreq = await this.create(staffId, _file.id, contractId, data);

      return lreq;
    } catch (error) {
      Logger.log('error filling docx template');
      Logger.log(error);
      console.log(error);
    }
  }

  private getChargeableDayForDate(
    date: Date,
    AMPMStart: string,
    AMPMEnd: string,
    index: number,
    length: number,
  ): number {
    // If the date is the first date in the range, use the AMPMStart value to determine the chargeable day
    if (index === 0) {
      if (AMPMStart === 'AMPM') {
        return 1;
      } else {
        return 0.5;
      }
    }
    // If the date is the last date in the range, use the AMPMEnd value to determine the chargeable day
    else if (index === length - 1) {
      if (AMPMEnd === 'AMPM') {
        return 1;
      } else {
        return 0.5;
      }
    }
    // For all other dates, the chargeable day is always 1
    else {
      return 1;
    }
  }
  async create(
    staffId: number,
    fileId: number,
    contractId: number,
    data: Prisma.LeaveRequestCreateInput,
  ) {
    const staff = await this.prisma.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${staffId} not found`);
    }
    Logger.log('staff?', staff);

    try {
      const leaveRequest = await this.prisma.leaveRequest.create({
        data: {
          ...data,
          staffFile: { connect: { id: fileId } },
          contract: { connect: { id: contractId } },
          staff: { connect: { id: staffId } },
        },
      });

      const dateArr = this.getDateArray(
        leaveRequest.leavePeriodStart,
        leaveRequest.leavePeriodEnd,
      );

      /*
      model CalendarVacation {
        VacationDate  DateTime @id
        ChargeableDay Decimal
        leaveRequest  LeaveRequest @relation(fields: [LeaveRequestId], references: [id])
        LeaveRequestId Int
      }
      
      */
      try {
        let vaca = [];
        for (const element of dateArr) {
          const index = dateArr.indexOf(element);
          const cday = this.getChargeableDayForDate(
            element,
            leaveRequest.AMPMStart,
            leaveRequest.AMPMEnd,
            index,
            dateArr.length,
          );
          console.log('chargable days:');
          console.log(cday);

          const rtn = await this.prisma.calendarVacation.create({
            data: {
              VacationDate: element,
              ChargeableDay: cday,
              leaveRequest: {
                connect: {
                  id: leaveRequest.id,
                },
              },
            },
          });
          vaca.push(rtn);
        }
        console.log(vaca);
      } catch (error) {
        console.log(error);
        throw error;
      }

      return leaveRequest;
    } catch (error) {
      Logger.error(`Failed to create leave request: ${error}`);
      console.log(error);
      throw error;
    }
  }
  async findAll(): Promise<LeaveRequest[]> {
    return this.prisma.leaveRequest.findMany();
  }

  async findAllPublicHoliday(): Promise<PublicHoliday[]> {
    return this.prisma.publicHoliday.findMany();
  }

  async findOne(id: number): Promise<LeaveRequest> {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async update(params: {
    id: number;
    data: Prisma.LeaveRequestUpdateInput;
  }): Promise<LeaveRequest> {
    const { id, data } = params;
    await this.prisma.leaveRequest.update({ where: { id }, data });
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.leaveRequest.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }
}
