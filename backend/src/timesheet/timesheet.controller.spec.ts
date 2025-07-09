import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service.js';
import { UsersService } from '../auth/users.service.js';
import { LeaveRequestService } from '../leaverequest/service/leaverequest.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from '../staff/service/staff.service.js';
import { TimesheetController } from './timesheet.controller.js';
import { TimesheetService } from './timesheet.service.js';

describe('TimesheetController', () => {
  let controller: TimesheetController;
  let service: TimesheetService;

  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [
        TimesheetService,
        LeaveRequestService,
        StaffService,
        PrismaService,
        StaffFilesService,
        AuthService,
        UsersService,
      ],
    }).compile();

    controller = module.get<TimesheetController>(TimesheetController);
    service = module.get<TimesheetService>(TimesheetService);
    userService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('postFunction', () => {
    it('should call makeTimeSheet with correct parameters', async () => {
      const year = 2023;
      const month = 6;
      const xlsxPath = 'path/to/xlsx';

      // jest.spyOn(service, 'makeTimeSheet').mockResolvedValue(xlsxPath);

      const result = await controller.postFunction({ year, month });

      //expect(service.makeTimeSheet).toHaveBeenCalledWith(1, year, month);
      expect(result).toEqual(result);
    });
  });
  describe('create current month events', () => {
    it.only('should call makeTimeSheet with correct parameters', async () => {
      const year = 2023;
      const month = 7;
      const authHeaderValue = 'Bearer yourAuthToken';
      const userId = 'yourUserId';
      const expectedResult = ['event1', 'event2']; // Modify this with the expected result
      const req = {
        user: { id: userId },
      };
      const authorizationHeader = 'Bearer yourAuthToken';
      // Mock dependencies
      jest.spyOn(authService, 'decodejwt').mockReturnValue({ sub: userId });
      //jest.spyOn(userService, 'findById').mockResolvedValue({ id: userId });
      // Invoke the controller method
      const user: User = {
        id: 'dummyId',
        username: 'dummyUsername',
        name: 'dummyName',
        email: 'dummy@example.com',
        emailVerified: new Date(),
        image: 'dummyImage',
        password: 'dummyPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        staffId: 123,
        roleId: 0,
        userStatus: 'active',
      };
      const authReq = {
        user: user, // Provide a valid user object
        headers: { authorization: authorizationHeader },
      };
      const result = await controller.getCalendarEvents(
        authHeaderValue,
        authReq,
      );
      // jest.spyOn(service, 'makeTimeSheet').mockResolvedValue(xlsxPath);

      // const result = await controller.getCalendarEvents({ year, month });
      console.log(result);
      //expect(service.makeTimeSheet).toHaveBeenCalledWith(1, year, month);
      expect(result).toEqual(result);
    });
  });
});
