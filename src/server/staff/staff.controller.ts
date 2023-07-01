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
    StreamableFile,
    UseInterceptors,

    Header,
    HttpStatus,
} from '@nestjs/common';
import { StaffService } from './service/staff.service';
import { Prisma, Staff } from '@prisma/client';
import LeaveRequestService from '../leaverequest/service/leaverequest.service';
import { StaffFilesService } from '../shared/staffFiles.service';
import { createReadStream } from 'fs';
import type { Response } from 'express';
@Controller('api/staff')
export class StaffController {

    constructor(private readonly staffService: StaffService, private readonly staffFilesService: StaffFilesService) { }
    @Post()
    create(@Body() stf: Prisma.StaffCreateInput): Promise<Staff> {
        const result = this.staffService.createStaff(stf).then();
        console.log(result);
        return result;
    }
    @Get('download/:id')
    async download(@Param('id') staffFileId: number, @Res() res: Response) {
        try {
            const stafffile = (await this.staffFilesService.findOne(staffFileId));
            Logger.debug("staff file:")
            Logger.debug(stafffile)

            const stfFilePath = stafffile.filePath;
            const downloadFileName = stfFilePath.substring(stfFilePath.lastIndexOf('/') + 1);

            res.setHeader('Content-Disposition', `attachment; filename=${downloadFileName}`);
            if (!stfFilePath) {
                throw new NotFoundException(`File with ID ${staffFileId} not found`);
            }
            const _file = createReadStream(stfFilePath);
            _file.pipe(res);

        } catch (err) {
            console.error(err);

            throw new InternalServerErrorException(`Failed to download, error:${err}`);
        }
    }
    @Get(':id')
    async getStaffById(@Param('id') id: number): Promise<Staff> {
        return this.staffService.getStaffById(id);
    }
}
