import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetService } from './timesheet.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TimesheetService', () => {
  let service: TimesheetService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetService, PrismaService],
    }).compile();
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [UsersService, PrismaService],
    // }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<TimesheetService>(TimesheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of calendar time sheet entries for a specific staff member for a given year and month', async () => {
    const staffId = 1;
    const year = 2024;
    const month = 2;
    const result = await service.getCalendar(staffId, year, month);
    // assertion here
  });
  it('should return an array of calendar time sheet entries for a specific staff member for a given year and month', async () => {
    const staffId = 1;
    const year = 2024;
    const month = 2;
    const result = await service.makeTimeSheet(staffId, year, month);
    // assertion here
  });
});
