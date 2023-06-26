import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LeaveRequest, Prisma } from '@prisma/client';
import { StaffService } from '../../staff/service/staff.service'
import * as fs from 'fs-extra';
import * as path from 'path';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { format } from 'date-fns'
@Injectable()
export class LeaveRequestService {
  constructor(private prisma: PrismaService, private staffservice: StaffService) { }
  async createLeaveRequestforgql(leaveRequestData) {
    const createdLeaveRequest = await this.prisma.leaveRequest.create({
      data: leaveRequestData
    });
    return createdLeaveRequest;
  }
  getFilePath(filename: string) {
    return `${__dirname}/../../../../timesheet/${filename}`;
  }
  private formatdate(_date): String {
    return format(new Date(_date), 'dd/MM/yyyy')
  }
  async createword(staffId: number, data: Prisma.LeaveRequestCreateInput) {
    const date = new Date(Date.now());
    const formattedDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/[^\d]/g, '');
    const sourcePath = this.getFilePath('LeaveAppForm.docx');
    const destPath = this.getFilePath(`LeaveAppForm_${formattedDate}.docx`);
    const destPDF = this.getFilePath(`LeaveAppForm_${formattedDate}.pdf`);

    console.log(destPath);
    if (fs.existsSync(destPath)) {
      console.log('Destination file already exists!');
      fs.unlinkSync(destPath);
    }

    try {
      // Copy the file
      console.log(`source path, ${sourcePath}`)
      console.log(`dest source path, ${destPath}`)
      const data = await fs.promises.readFile(sourcePath);
      await fs.promises.writeFile(destPath, data);
      console.log('File copied successfully!');
    } catch (err) {
      console.error('Error copying file:', err);
      return '';
    }

    //render field values.
    try {
      console.log('destpath?' + destPath)
      const templatePath = destPath;//path.resolve(__dirname, '../../../leaveForm.docx');
      const content = fs.readFileSync(templatePath, 'binary');
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      const staff = await this.staffservice.getStaffById(1);
      /*
          doc.setData({
            staffname: "hello",
          });
      
          doc.render();
      */
      const leaveperiodstart = this.formatdate(data.leavePeriodStart);
      const leaveperiodend = this.formatdate(data.leavePeriodEnd);
      const dateofreturn = this.formatdate(data.dateOfReturn);

      doc.render({
        staffname: staff.StaffName
        , staffcategory: staff.StaffCategory
        , agentname: staff.AgentName
        , leaveperiod: `${leaveperiodstart} ${data.AMPMStart=="AMPM"?"":data.AMPMStart} to  ${leaveperiodend} ${data.AMPMEnd=="AMPM"?"":data.AMPMEnd}`
        , leavedays: `${data.leaveDays} Day(s)`
        , dateofreturn: this.formatdate(data.dateOfReturn)
        , staffsigndate: this.formatdate(data.staffSignDate)

      });
      const buffer = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(destPath, buffer);
    } catch (error) {
      console.log('error filling docx template')
      console.log(error);
    }


    await this.create(staffId, data);
  }
  async create(staffId: number, data: Prisma.LeaveRequestCreateInput) {
    const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
    if (!staff) {
      throw new Error(`Staff member with ID ${staffId} not found`);
    }
    Logger.log("staff?", staff)

    try {
      const leaveRequest = await this.prisma.leaveRequest.create({ data });
      return leaveRequest;
    } catch (error) {
      Logger.error(`Failed to create leave request: ${error}`);
      throw error;
    }
    return null;
  }
  async findAll(): Promise<LeaveRequest[]> {
    return this.prisma.leaveRequest.findMany();
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
    await this.prisma.leaveRequest.delete({ where: { id } });
  }
}