import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete
} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {Prisma, Staff} from '@prisma/client';
@Controller('api/user')
export class UserController {
    constructor(private readonly userService : UserService) {}
    @Post()
    create(@Body()stf : Prisma.StaffCreateInput): Promise < Staff > {
        const result = this.userService.createUser(stf).then();
        console.log(result);
        return result;
    }
}
