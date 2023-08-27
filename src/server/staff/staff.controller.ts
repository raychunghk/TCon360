import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  Res,
  UseGuards,
  StreamableFile,
  UseInterceptors,
  Req,
  Header,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { StaffService } from './service/staff.service';
import { Prisma, Staff, StaffContract } from '@prisma/client';
//import LeaveRequestService from '../leaverequest/service/leaverequest.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import type { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../auth/users.service';
//import type { Request  } from 'express';
import type { AuthReqInterface } from '../AuthReqInterface';
import { UpdateStaffDto } from 'src/customDto/customDTOs';
@Controller('api/staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly staffFilesService: StaffFilesService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Put('contract/:id')
  async updateStaffContract(
    @Param('id') id: string,
    @Body() updateStaffContractDto: Prisma.StaffContractUpdateInput,
  ) {
    try {
      Logger.debug('update staff contract info', updateStaffContractDto);
      const rtn = this.staffService.updateStaffContract(
        parseInt(id),
        updateStaffContractDto,
      );
      return rtn;
    } catch (error) {
      Logger.error('error', error);
    }
  }

  @Put('updatecontracts')
  async updateContracts(
    @Body() contractUpdates: Prisma.StaffContractUncheckedCreateInput[],
  ) {
    try {
      for (const contractUpdate of contractUpdates) {
        const { id, ...updateStaffContractDto } = contractUpdate;
        await this.staffService.updateStaffContract(id, updateStaffContractDto);
      }
      return { message: 'Contracts updated successfully' };
    } catch (error) {
      return { error: 'Failed to update contracts' };
    }
  }

  @Get('hello/:id')
  getHello(@Param('id') id: string): string {
    this.staffService.deleteContract(parseInt(id));
    return `hello ${id}`;
  }
  @Delete('contract/:cid')
  async deleteContract3(@Param('cid') cid: string) {
    const id = parseInt(cid);
    return this.staffService.deleteContract(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() stf: Prisma.StaffCreateInput,
    @Headers('Authorization') auth: string,
    @Req() req: AuthReqInterface,
  ): Promise<Staff> {
    console.log('user?');
    const user = req.user;
    console.log(auth);
    //console.log(req)
    const token = auth.split(' ')[1];
    try {
      const decodedtoken = this.authService.decodejwt(token);
      const userId = decodedtoken.sub;
      // Find the user with the given userId
      const user = await this.userService.findById(userId);

      const result = this.staffService.createStaff(stf, userId).then();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('/xx')
  async create2(@Body() stf: Prisma.StaffCreateInput): Promise<Staff> {
    //console.log(req)
    const token = '111';
    try {
      const decodedtoken = this.authService.decodejwt(token);
      const userId = decodedtoken.sub;
      // Find the user with the given userId
      const user = await this.userService.findById(userId);
      const stfWithUserId = { ...stf, userId: user.id };

      const result = this.staffService.createStaff(stf, user.id).then();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('createcontract')
  async createContract(
    @Body() contract: Prisma.StaffContractUncheckedCreateInput,
  ) {
    return this.staffService.createContract(contract);
  }
  @Get('download/:id')
  async download(@Param('id') staffFileId: number, @Res() res: Response) {
    try {
      const stafffile = await this.staffFilesService.findOne(staffFileId);
      Logger.debug('staff file:');
      Logger.debug(stafffile);

      const stfFilePath = stafffile.filePath;
      const downloadFileName = stfFilePath.substring(
        stfFilePath.lastIndexOf('/') + 1,
      );

      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${downloadFileName}`,
      );
      if (!stfFilePath) {
        throw new NotFoundException(`File with ID ${staffFileId} not found`);
      }
      const _file = createReadStream(stfFilePath);
      _file.pipe(res);
    } catch (err) {
      console.error(err);

      throw new InternalServerErrorException(
        `Failed to download, error:${err}`,
      );
    }
  }
  @Get(':id')
  async getStaffById(@Param('id') id: number): Promise<Staff> {
    return this.staffService.getStaffById(id);
  }

  @Put(':id')
  async updateStaff(
    @Param('id') id: number,
    @Body() updateStaff: UpdateStaffDto, // Replace Prisma.StaffUpdateInput with your custom DTO
  ) {
    // async updateStaff(
    //   @Param('id') id: number,
    //   @Body() updateStaff: Prisma.StaffUpdateInput,
    // ) {
    console.log('in update staff', updateStaff);

    const rtn = await this.staffService.updateStaff(Number(id), updateStaff);
    console.log('rtn', rtn);

    Logger.log(rtn);
    return rtn;
  }
}
