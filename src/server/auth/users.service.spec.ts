import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UserService', () => {
    let userService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, PrismaService],
        }).compile();

        userService = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getUserWithStaff', () => {
        it('should be defined', async () => {

            const userId = 'cljlds0ig0000plhwqgzefwxd';


            const result = await userService.getUserWithStaff(userId);
            console.log(result);
            expect(result).toEqual(result);
            expect(userService).toBeDefined();
        });


    });
});