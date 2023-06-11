import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import type { LeaveRequest } from '@prisma/client';
import { LeaveRequestService } from './service/leaverequest.service';

@Controller('/api/leaverequest')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService) {}

  @Post()
  async create(@Body() data: LeaveRequest): Promise<LeaveRequest> {
    return this.leaveRequestService.create(data);
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