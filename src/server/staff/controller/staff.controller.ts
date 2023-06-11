import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete
} from '@nestjs/common';
import {StaffService} from '../service/staff.service';
import {Prisma, Staff} from '@prisma/client';
@Controller('api/user')
export class StaffController {
    constructor(private readonly staffService : StaffService) {}
    @Post()
    create(@Body()stf : Prisma.StaffCreateInput): Promise < Staff > {
        const result = this.staffService.createStaff(stf).then();
        console.log(result);
        return result;
    }
    @Get(':id')
    async getStaffById(@Param('id') id: string): Promise<Staff> {
      return this.staffService.getStaffById(id);
    }
}
