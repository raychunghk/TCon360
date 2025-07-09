import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from './users.service.js';

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

  describe('getUserWithViewStaff', () => {
    it('should be defined', async () => {
      const userId = 'cllno93bm0001plh3tsbdj0ff';

      const result = await userService.getUserWithViewStaff(userId);
      console.log(result);
      expect(result).toEqual(result);
      expect(userService).toBeDefined();
    });
  });
  describe('getUserWithStaffAndContract', () => {
    it('should be defined', async () => {
      const userId = 'cllno93bm0001plh3tsbdj0ff';

      const result = await userService.getUserWithStaffAndContract(userId);
      console.log(result);
      expect(result).toEqual(result);
      expect(userService).toBeDefined();
    });
  });
});
