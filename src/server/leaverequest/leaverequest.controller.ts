import {
  Logger, Body, Controller, Delete, Get, Param, Post, Put, Res,
  StreamableFile,
  UseInterceptors,
  Response as NsResponse,
  NotFoundException,
  InternalServerErrorException,
  Header,
  HttpStatus,
} from '@nestjs/common';
import type { Prisma, LeaveRequest } from '@prisma/client';
import { LeaveRequestService } from './service/leaverequest.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { createReadStream } from 'fs';

@Controller('/api/leaverequest')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService, private readonly staffFilesService: StaffFilesService) { }
  @Post(':staffId')
  async createLeaveRequest(
    @Param('staffId') staffId: string,
    @Body() leaveRequestData: Prisma.LeaveRequestCreateInput,
  ) {
    Logger.verbose("hello")
    Logger.log("staffid", staffId);
    Logger.log("leaveRequestData", leaveRequestData);
    //const leaveRequest = await this.leaveRequestService.create(parseInt(staffId), leaveRequestData);
    const leaveRequest = await this.leaveRequestService.createword(parseInt(staffId), leaveRequestData);
    Logger.log("create result", leaveRequest)

    return leaveRequest;
    // return {
    //   leavePeriodStart: leaveRequest.leavePeriodStart,
    //   leavePeriodEnd: leaveRequest.leavePeriodEnd,
    //   AMPMStart: leaveRequest.AMPMStart,
    //   AMPMEnd: leaveRequest.AMPMEnd,
    //   leaveDays: leaveRequest.leaveDays,
    //   dateOfReturn: leaveRequest.dateOfReturn,
    //   staffSignDate: leaveRequest.staffSignDate,
    //   staffId: leaveRequest.staffId,
    //   fileID: leaveRequest.fileId
    // }
  }
  @Post()
  async createLeaveRequest2(@Body() leaveRequestData) {
    return this.leaveRequestService.createLeaveRequestforgql(leaveRequestData);
  }
  @Get()
  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeaveRequest> {
    return this.leaveRequestService.findOne(+id);
  }

  @Get('download/:id')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  async download(@Param('id') staffFileId: number, @Res() res: Response) {
    try {
      const stfFilePath = (await this.staffFilesService.findOne(staffFileId)).filePath;

      if (!stfFilePath) {
        throw new NotFoundException(`File with ID ${staffFileId} not found`);
      }
      const _file = createReadStream(stfFilePath);
      return new StreamableFile(_file);
    } catch (err) {
      console.error(err);
      InternalServerErrorException
      throw new InternalServerErrorException(`Failed to download, error:${err}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: LeaveRequest,
  ): Promise<LeaveRequest> {
    return this.leaveRequestService.update({ id: +id, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.leaveRequestService.remove(+id);
  }
}