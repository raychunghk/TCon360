import {
  Logger,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
  UseInterceptors,
  NotFoundException,
  InternalServerErrorException,
  Header,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Prisma, LeaveRequest } from '@prisma/client';
import { LeaveRequestService } from './service/leaverequest.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { createReadStream } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../auth/users.service';

@Controller('/api/leaverequest')
export class LeaveRequestController {
  constructor(
    private leaveRequestService: LeaveRequestService,
    private readonly staffFilesService: StaffFilesService,
    private readonly usrSvc: UsersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLeaveRequest(
    @Req() req,
    @Body() leaveRequestData: Prisma.LeaveRequestCreateInput,
  ) {
    const userId = req.user.id;
    const user = await this.usrSvc.getUserWithViewStaff(userId);
    //const staffId = user.staffId ? user.staffId : user.staff[0].id;
    const staffId = user.viewStaff[0].StaffId;
    const contractId = user.viewStaff[0].contractId;
    Logger.log('staffid', staffId);
    Logger.log('leaveRequestData', leaveRequestData);
    const attributeName = 'contractId';
    if (leaveRequestData.hasOwnProperty(attributeName)) {
      delete leaveRequestData[attributeName];
    }
    //const leaveRequest = await this.leaveRequestService.create(parseInt(staffId), leaveRequestData);
    const leaveRequest = await this.leaveRequestService.createword(
      staffId,
      contractId,
      leaveRequestData,
    );
    Logger.log('create result', leaveRequest);

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
  @Post('/staff/:staffId')
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: LeaveRequest,
  ): Promise<LeaveRequest> {
    return this.leaveRequestService.update({ id: +id, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleteResult = await this.leaveRequestService.remove(+id);
    return deleteResult;
  }
}
