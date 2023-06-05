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
    create(@Body()userInfo : Prisma.StaffCreateInput): Promise < Staff > {
        const result = this.userService.createUser(userInfo).then();
        console.log(result);
        return result;
    }
}
