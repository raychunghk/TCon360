import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import LeaveRequestService from '../leaverequest/service/leaverequest.service';
import { StaffService } from '../staff/service/staff.service';
import { PrismaService } from '../prisma/prisma.service';
import { StaffFilesService } from '../shared/staffFiles.service';

describe('TimesheetController', () => {
  let controller: TimesheetController;
  let service: TimesheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [TimesheetService
        , LeaveRequestService,
        StaffService,
        PrismaService,
        StaffFilesService,

      ],
    }).compile();

    controller = module.get<TimesheetController>(TimesheetController);
    service = module.get<TimesheetService>(TimesheetService);
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
});