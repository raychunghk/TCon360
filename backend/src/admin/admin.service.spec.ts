import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdminService', () => {
  let adminService: AdminService;

  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, PrismaService],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });
  describe('createPublicHoliday', () => {
    jest.setTimeout(180000); // 3 minutes
    it('should create public holiday records successfully', async () => {
      /*const fetchPublicHolidaysSpy = jest
        .spyOn(adminService, 'fetchPublicHolidays')
        .mockResolvedValueOnce(['holiday1', 'holiday2']);

      const createHolidayRecordsSpy = jest
        .spyOn(adminService, 'createHolidayRecords')
        .mockResolvedValueOnce(undefined);

      const gencalendarSpy = jest
        .spyOn(adminService, 'gencalendar')
        .mockResolvedValueOnce(undefined);*/

      const consoleLogSpy = jest.spyOn(console, 'log');

      await adminService.createPublicHoliday(
        'https://www.1823.gov.hk/common/ical/tc.json',
      );

      /*expect(fetchPublicHolidaysSpy).toHaveBeenCalledWith(
        'https://www.1823.gov.hk/common/ical/tc.json',
      );*/
      /* expect(createHolidayRecordsSpy).toHaveBeenCalledWith([
        'holiday1',
        'holiday2',
      ]);
      expect(gencalendarSpy).toHaveBeenCalled();*/
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Public holiday records generated successfully.',
      );
    });
  });
});
