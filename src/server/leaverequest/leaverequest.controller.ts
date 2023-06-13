import {Logger, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import type { Prisma, LeaveRequest } from '@prisma/client';
import { LeaveRequestService } from './service/leaverequest.service';
 
@Controller('/api/leaverequest')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService) { }
  @Post(':staffId')
  async createLeaveRequest(
    @Param('staffId') staffId: string,
    @Body() leaveRequestData: Prisma.LeaveRequestCreateInput,
  ) {
    Logger.verbose("hello")
    Logger.log("staffid", staffId);
    Logger.log("leaveRequestData", leaveRequestData);
    const leaveRequest = await this.leaveRequestService.create(parseInt(staffId), leaveRequestData);
    Logger.log("create result", leaveRequest)
    return leaveRequest;
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